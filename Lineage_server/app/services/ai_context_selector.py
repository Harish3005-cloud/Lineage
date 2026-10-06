"""
LINEAGE AI Gateway Project Context Selector
This service performs project-scoped context selection and authorization.
"""
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from app.db.models.user import User, UserRole
from app.db.models.project import Project
from app.db.models.project_member import ProjectMember, MembershipStatus
from app.db.models.contribution import Contribution
from app.db.models.milestone import Milestone
from app.db.models.ai_action import SensitivityLevel

class ContextSelectionResult(BaseModel):
    project_id: UUID
    project_title: str
    snapshot_version: str
    selected_context: Dict[str, Any]
    sensitivity: SensitivityLevel
    decision: str  # ALLOWED or BLOCKED
    reason: str

class ContextRequestItem(BaseModel):
    type: str
    id: Optional[UUID] = None
    text: Optional[str] = None

def get_project_context(
    db: Session,
    project_id: UUID,
    user_id: UUID,
    requested_context: List[ContextRequestItem]
) -> ContextSelectionResult:
    # 1. Authenticate user
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        return ContextSelectionResult(
            project_id=project_id, project_title="Unknown", snapshot_version="",
            selected_context={}, sensitivity=SensitivityLevel.RESTRICTED,
            decision="BLOCKED", reason="User not found"
        )
    
    # 2. Verify project exists
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        return ContextSelectionResult(
            project_id=project_id, project_title="Unknown", snapshot_version="",
            selected_context={}, sensitivity=SensitivityLevel.RESTRICTED,
            decision="BLOCKED", reason="Project not found"
        )
    
    # 3. Require ACCEPTED project membership (or be Sponsor/Admin)
    is_sponsor = project.sponsor_id == user.user_id
    is_admin = user.role == UserRole.ADMIN
    if not (is_sponsor or is_admin):
        membership = db.query(ProjectMember).filter(
            ProjectMember.project_id == project_id,
            ProjectMember.user_id == user_id
        ).first()
        if not membership or membership.status != MembershipStatus.ACCEPTED:
            return ContextSelectionResult(
                project_id=project_id, project_title=project.title, snapshot_version="",
                selected_context={}, sensitivity=SensitivityLevel.RESTRICTED,
                decision="BLOCKED", reason="Cross-project context access denied or membership not ACCEPTED"
            )

    # 4 & 5. Process requested context and enforce project boundaries
    selected_data = {}
    highest_sensitivity = SensitivityLevel.PUBLIC
    
    def upgrade_sensitivity(current: SensitivityLevel, new: SensitivityLevel) -> SensitivityLevel:
        order = {
            SensitivityLevel.PUBLIC: 0,
            SensitivityLevel.INTERNAL: 1,
            SensitivityLevel.CONFIDENTIAL: 2,
            SensitivityLevel.RESTRICTED: 3
        }
        return new if order[new] > order[current] else current

    for item in requested_context:
        if item.type == "project_summary":
            selected_data["project_summary"] = project.title
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.PUBLIC)
            
        elif item.type == "confidential_brief":
            selected_data["confidential_brief"] = project.description or "Confidential Content"
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.CONFIDENTIAL)
            
        elif item.type == "milestone":
            if not item.id:
                continue
            milestone = db.query(Milestone).filter(Milestone.milestone_id == item.id).first()
            if not milestone or milestone.project_id != project_id:
                return ContextSelectionResult(
                    project_id=project_id, project_title=project.title, snapshot_version="",
                    selected_context={}, sensitivity=SensitivityLevel.RESTRICTED,
                    decision="BLOCKED", reason=f"Cross-project reference denied (Milestone {item.id})"
                )
            selected_data[f"milestone_{item.id}"] = milestone.title
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.INTERNAL)
            
        elif item.type == "contribution":
            if not item.id:
                continue
            contribution = db.query(Contribution).filter(Contribution.contribution_id == item.id).first()
            if not contribution or contribution.project_id != project_id:
                return ContextSelectionResult(
                    project_id=project_id, project_title=project.title, snapshot_version="",
                    selected_context={}, sensitivity=SensitivityLevel.RESTRICTED,
                    decision="BLOCKED", reason=f"Cross-project reference denied (Contribution {item.id})"
                )
            selected_data[f"contribution_{item.id}"] = contribution.description
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.INTERNAL)
            
        elif item.type == "selected_text":
            selected_data["selected_text"] = item.text
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.INTERNAL)
            
        elif item.type == "project_files":
            selected_data["project_files"] = "Main model logic"
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.INTERNAL)
            
        elif item.type == "restricted_context":
            selected_data["restricted_context"] = "Strictly internal secrets"
            highest_sensitivity = upgrade_sensitivity(highest_sensitivity, SensitivityLevel.RESTRICTED)

    snapshot_version = f"v{int(datetime.now(timezone.utc).timestamp())}"

    return ContextSelectionResult(
        project_id=project_id,
        project_title=project.title,
        snapshot_version=snapshot_version,
        selected_context=selected_data,
        sensitivity=highest_sensitivity,
        decision="ALLOWED",
        reason="Authorized access"
    )
