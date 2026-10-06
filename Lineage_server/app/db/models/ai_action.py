import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, JSON, DateTime, Enum as SAEnum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base

class AIActionStatus(str, enum.Enum):
    REQUESTED = "REQUESTED"
    BLOCKED = "BLOCKED"
    SENT_TO_MODEL = "SENT_TO_MODEL"
    OUTPUT_RECEIVED = "OUTPUT_RECEIVED"
    PENDING_REVIEW = "PENDING_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    FAILED = "FAILED"

class SensitivityLevel(str, enum.Enum):
    PUBLIC = "PUBLIC"
    INTERNAL = "INTERNAL"
    CONFIDENTIAL = "CONFIDENTIAL"
    RESTRICTED = "RESTRICTED"

class HumanDecision(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class AIAction(Base):
    __tablename__ = "ai_actions"

    ai_action_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.project_id", ondelete="CASCADE"), nullable=False)
    human_owner_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="RESTRICT"), nullable=False)
    agent_name = Column(String(255), nullable=False)
    model_name = Column(String(255), nullable=False)
    request_text = Column(Text, nullable=False)
    context_snapshot = Column(String(255), nullable=True)
    context_version = Column(String(255), nullable=True)
    selected_context = Column(JSON, nullable=True)
    sensitivity_level = Column(SAEnum(SensitivityLevel, name="sensitivity_level_enum", values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    redactions = Column(JSON, nullable=True, default=list)
    output_hash = Column(String(64), nullable=True)
    proposed_action = Column(JSON, nullable=True)
    status = Column(SAEnum(AIActionStatus, name="ai_action_status_enum", values_callable=lambda obj: [e.value for e in obj]), nullable=False, default=AIActionStatus.REQUESTED)
    human_decision = Column(SAEnum(HumanDecision, name="human_decision_enum", values_callable=lambda obj: [e.value for e in obj]), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    reviewed_at = Column(DateTime(timezone=True), nullable=True)

    project = relationship("Project")
    human_owner = relationship("User")
