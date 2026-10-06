import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base

class AIReceipt(Base):
    __tablename__ = "ai_receipts"

    receipt_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ai_action_id = Column(UUID(as_uuid=True), ForeignKey("ai_actions.ai_action_id", ondelete="CASCADE"), nullable=False)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.project_id", ondelete="CASCADE"), nullable=False)
    human_owner_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="RESTRICT"), nullable=False)
    agent_name = Column(String(255), nullable=False)
    model_name = Column(String(255), nullable=False)
    context_version = Column(String(255), nullable=True)
    selected_files = Column(JSON, nullable=True)
    selected_context_hash = Column(String(64), nullable=True)
    redactions = Column(JSON, nullable=True, default=list)
    request_hash = Column(String(64), nullable=False)
    output_hash = Column(String(64), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    ai_action = relationship("AIAction")
    project = relationship("Project")
    human_owner = relationship("User")
