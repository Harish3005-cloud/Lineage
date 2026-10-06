from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from app.db.models.ai_action import AIActionStatus, SensitivityLevel, HumanDecision

class AIActionBase(BaseModel):
    agent_name: str
    model_name: str
    request_text: str
    context_snapshot: Optional[str] = None
    context_version: Optional[str] = None
    selected_context: Optional[List[Dict[str, Any]]] = None
    sensitivity_level: SensitivityLevel
    redactions: Optional[List[Dict[str, Any]]] = None
    output_hash: Optional[str] = None
    proposed_action: Optional[Dict[str, Any]] = None
    status: AIActionStatus = AIActionStatus.REQUESTED
    human_decision: Optional[HumanDecision] = None

class AIActionCreate(AIActionBase):
    pass

class AIActionResponse(AIActionBase):
    ai_action_id: UUID
    project_id: UUID
    human_owner_id: UUID
    created_at: datetime
    reviewed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class AIReceiptBase(BaseModel):
    ai_action_id: UUID
    project_id: UUID
    human_owner_id: UUID
    agent_name: str
    model_name: str
    context_version: Optional[str] = None
    selected_files: Optional[List[str]] = None
    selected_context_hash: Optional[str] = None
    redactions: Optional[List[Dict[str, Any]]] = None
    request_hash: str
    output_hash: Optional[str] = None

class AIReceiptResponse(AIReceiptBase):
    receipt_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
