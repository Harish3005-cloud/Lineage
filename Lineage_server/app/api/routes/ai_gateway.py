from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
import hashlib
import json

from app.db.database import get_db
from app.db.models.user import User
from app.db.models.ai_action import AIAction, AIActionStatus, SensitivityLevel
from app.db.models.ai_receipt import AIReceipt
from app.api.deps import get_current_user
from app.schemas.ai_gateway import GatewayRequest, GatewayResponse
from app.services.ai_gateway_policy import evaluate_gateway_policy, PolicyDecision
from app.services.ai_context_selector import ContextRequestItem
from app.services.ai_context_security import check_context_security
from app.services.ai_provider import get_ai_provider

router = APIRouter(tags=["AI Gateway"])

@router.post("/gateway/request", response_model=GatewayResponse)
def handle_ai_request(
    request: GatewayRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 2. Verify human_owner_id matches authenticated user
    if request.human_owner_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="human_owner_id must match authenticated user"
        )
    
    # Map ContextRequestItem
    ctx_items = [ContextRequestItem(type=i.type, id=i.id, text=i.text) for i in request.selected_context]

    # 3-10: Run Gateway Policy
    # This evaluates: project membership, cross-project references, sensitivity, secret scanning
    policy_res = evaluate_gateway_policy(
        db=db,
        project_id=request.project_id,
        user_id=current_user.user_id,
        model_name=request.model,
        request_type="propose_change", # Treat all Gateway API requests as proposing a change
        raw_text=request.task,
        requested_context=ctx_items
    )

    if policy_res.decision == PolicyDecision.BLOCK:
        return GatewayResponse(
            status="BLOCKED",
            decision=policy_res.decision.value,
            project_id=request.project_id,
            human_owner_id=current_user.user_id,
            agent_name=request.agent_name,
            model=request.model,
            reasons=policy_res.reasons,
            sensitivity=policy_res.sensitivity.value if policy_res.sensitivity else None
        )

    # 11. Create AIAction with status REQUESTED
    action = AIAction(
        project_id=request.project_id,
        human_owner_id=current_user.user_id,
        agent_name=request.agent_name,
        model_name=request.model,
        request_text=policy_res.sanitized_text or request.task,
        context_version="v_latest",
        selected_context=policy_res.selected_context,
        sensitivity_level=policy_res.sensitivity,
        redactions=[r.model_dump() for r in policy_res.redactions],
        status=AIActionStatus.REQUESTED
    )
    db.add(action)
    db.flush()
    
    # 12. Send ONLY sanitized context to AI provider
    provider = get_ai_provider()
    ai_res = provider.generate(
        sanitized_prompt=policy_res.sanitized_text or request.task,
        sanitized_context=policy_res.selected_context or {}
    )
    
    # 13. Scan AI output for secrets
    output_sec_res = check_context_security(ai_res.output, policy_res.sensitivity, request.model)
    
    # 14. Reject/block unsafe output if required
    if output_sec_res.blocked:
        action.status = AIActionStatus.BLOCKED
        db.commit()
        return GatewayResponse(
            ai_action_id=action.ai_action_id,
            status="BLOCKED",
            decision="BLOCK",
            project_id=request.project_id,
            human_owner_id=current_user.user_id,
            agent_name=request.agent_name,
            model=request.model,
            reasons=["Output blocked due to security policy violations"]
        )
        
    final_output = output_sec_res.sanitized_text
    
    # 15. Generate output hash
    req_hash = hashlib.sha256((policy_res.sanitized_text or request.task).encode()).hexdigest()
    out_hash = hashlib.sha256(final_output.encode()).hexdigest()
    
    action.output_hash = out_hash
    action.proposed_action = {"raw_output": final_output}
    
    # 17. Set AIAction to PENDING_REVIEW
    action.status = AIActionStatus.PENDING_REVIEW
    
    # 16. Create AIReceipt
    receipt = AIReceipt(
        ai_action_id=action.ai_action_id,
        project_id=request.project_id,
        human_owner_id=current_user.user_id,
        agent_name=request.agent_name,
        model_name=request.model,
        context_version="v_latest",
        selected_files=list(policy_res.selected_context.keys()) if policy_res.selected_context else [],
        selected_context_hash=hashlib.sha256(json.dumps(policy_res.selected_context, sort_keys=True).encode()).hexdigest() if policy_res.selected_context else None,
        redactions=[r.model_dump() for r in policy_res.redactions],
        request_hash=req_hash,
        output_hash=out_hash
    )
    db.add(receipt)
    db.commit()
    db.refresh(action)
    db.refresh(receipt)
    
    # 18. Return the result to the frontend
    return GatewayResponse(
        ai_action_id=action.ai_action_id,
        status=action.status.value,
        decision=policy_res.decision.value,
        project_id=request.project_id,
        human_owner_id=current_user.user_id,
        agent_name=request.agent_name,
        model=request.model,
        context_version=action.context_version,
        selected_context=action.selected_context,
        sensitivity=action.sensitivity_level.value,
        redactions=action.redactions,
        output=final_output,
        output_hash=out_hash,
        receipt_id=receipt.receipt_id
    )

from app.schemas.ai_gateway import AIReviewRequest, AIReviewResponse
from datetime import datetime, timezone

def _get_action_for_review(ai_action_id: UUID, current_user: User, db: Session) -> AIAction:
    action = db.query(AIAction).filter(AIAction.ai_action_id == ai_action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="AI Action not found")
        
    if action.status != AIActionStatus.PENDING_REVIEW:
        raise HTTPException(status_code=400, detail=f"Action is not PENDING_REVIEW (current status: {action.status.value})")

    if action.human_owner_id != current_user.user_id:
        from app.db.models.project_member import ProjectMember
        # Check if authorized reviewer (Sponsor/Admin)
        if current_user.role not in [UserRole.SPONSOR, UserRole.ADMIN]:
            raise HTTPException(status_code=403, detail="Not authorized to review this action")
            
    return action

@router.post("/gateway/{ai_action_id}/approve", response_model=AIReviewResponse)
def approve_ai_action(
    ai_action_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    action = _get_action_for_review(ai_action_id, current_user, db)
    
    action.status = AIActionStatus.APPROVED
    action.human_decision = HumanDecision.APPROVED
    action.reviewed_at = datetime.now(timezone.utc)
    
    db.commit()
    db.refresh(action)
    
    return AIReviewResponse(
        ai_action_id=action.ai_action_id,
        status=action.status.value,
        decision="APPROVED",
        reviewer_id=current_user.user_id,
        reviewed_at=action.reviewed_at
    )

@router.post("/gateway/{ai_action_id}/reject", response_model=AIReviewResponse)
def reject_ai_action(
    ai_action_id: UUID,
    request: AIReviewRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not request.reason or not request.reason.strip():
        raise HTTPException(status_code=400, detail="Rejection reason is required")
        
    action = _get_action_for_review(ai_action_id, current_user, db)
    
    action.status = AIActionStatus.REJECTED
    action.human_decision = HumanDecision.REJECTED
    action.reviewed_at = datetime.now(timezone.utc)
    
    db.commit()
    db.refresh(action)
    
    return AIReviewResponse(
        ai_action_id=action.ai_action_id,
        status=action.status.value,
        decision="REJECTED",
        reviewer_id=current_user.user_id,
        reviewed_at=action.reviewed_at,
        reason=request.reason
    )
