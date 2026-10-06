import enum
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from app.db.models.user import User
from app.db.models.ai_action import SensitivityLevel
from app.services.ai_context_selector import get_project_context, ContextRequestItem
from app.services.ai_context_security import check_context_security, RedactionItem

class PolicyDecision(str, enum.Enum):
    ALLOW = "ALLOW"
    BLOCK = "BLOCK"
    REDACT_AND_ALLOW = "REDACT_AND_ALLOW"
    REVIEW_REQUIRED = "REVIEW_REQUIRED"

class GatewayPolicyResult(BaseModel):
    allowed: bool
    decision: PolicyDecision
    reasons: List[str]
    sensitivity: Optional[SensitivityLevel] = None
    redactions: List[RedactionItem] = []
    project_id: Optional[UUID] = None
    human_owner_id: Optional[UUID] = None
    sanitized_text: Optional[str] = None
    selected_context: Optional[Dict[str, Any]] = None

def evaluate_gateway_policy(
    db: Session,
    project_id: UUID,
    user_id: Optional[UUID],
    model_name: str,
    request_type: str,
    raw_text: str,
    requested_context: List[ContextRequestItem]
) -> GatewayPolicyResult:
    # 1 & 3: Auth & Human owner
    if not user_id:
        return GatewayPolicyResult(allowed=False, decision=PolicyDecision.BLOCK, reasons=["No authenticated user"], project_id=project_id)
        
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        return GatewayPolicyResult(allowed=False, decision=PolicyDecision.BLOCK, reasons=["No human owner found"], project_id=project_id)

    # 9 & 10: Request type checks for AI side effects and autonomous actions
    if request_type in ["execute_side_effect", "autonomous_action", "apply_patch"]:
        return GatewayPolicyResult(allowed=False, decision=PolicyDecision.BLOCK, reasons=["AI side effects are not permitted"], project_id=project_id, human_owner_id=user_id)
        
    if request_type == "approve_output":
        return GatewayPolicyResult(allowed=False, decision=PolicyDecision.BLOCK, reasons=["AI cannot approve its own output"], project_id=project_id, human_owner_id=user_id)

    # 2, 4, 5: Context Selection & Project Membership
    context_res = get_project_context(db, project_id, user_id, requested_context)
    if context_res.decision == "BLOCKED":
        return GatewayPolicyResult(allowed=False, decision=PolicyDecision.BLOCK, reasons=[context_res.reason], project_id=project_id, human_owner_id=user_id)

    # 6, 7, 8: Sensitivity, Model Allowlist, Secret Detection
    security_res = check_context_security(raw_text, context_res.sensitivity, model_name)
    if security_res.blocked:
        return GatewayPolicyResult(
            allowed=False, 
            decision=PolicyDecision.BLOCK, 
            reasons=security_res.reasons, 
            project_id=project_id, 
            human_owner_id=user_id,
            sensitivity=context_res.sensitivity
        )
        
    decision = PolicyDecision.ALLOW
    if security_res.redaction_count > 0:
        decision = PolicyDecision.REDACT_AND_ALLOW
        
    if request_type == "propose_change":
        decision = PolicyDecision.REVIEW_REQUIRED
        
    return GatewayPolicyResult(
        allowed=True,
        decision=decision,
        reasons=[],
        sensitivity=context_res.sensitivity,
        redactions=security_res.detected_secrets,
        project_id=project_id,
        human_owner_id=user_id,
        sanitized_text=security_res.sanitized_text,
        selected_context=context_res.selected_context
    )
