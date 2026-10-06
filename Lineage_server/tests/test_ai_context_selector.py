import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.database import SessionLocal, engine, Base
from app.db.models.user import User, UserRole
from app.db.models.project import Project
from app.db.models.project_member import ProjectMember, MembershipStatus, ProjectRole
from app.db.models.milestone import Milestone
from app.db.models.ai_action import SensitivityLevel
from app.services.ai_context_selector import get_project_context, ContextRequestItem

def setup_test_data(db):
    # Users
    sponsor = User(name="Sponsor", email="sponsor@test.com", password_hash="fake", age=30, role=UserRole.SPONSOR)
    admin = User(name="Admin", email="admin@test.com", password_hash="fake", age=30, role=UserRole.ADMIN)
    accepted_member = User(name="Member1", email="member1@test.com", password_hash="fake", age=25, role=UserRole.EXPERT)
    applied_member = User(name="Member2", email="member2@test.com", password_hash="fake", age=25, role=UserRole.STUDENT)
    non_member = User(name="NonMember", email="nonmember@test.com", password_hash="fake", age=25, role=UserRole.STUDENT)
    
    db.add_all([sponsor, admin, accepted_member, applied_member, non_member])
    db.flush()

    # Projects
    project_a = Project(title="Project A", sponsor_id=sponsor.user_id, description="Confidential A")
    project_b = Project(title="Project B", sponsor_id=sponsor.user_id, description="Confidential B")
    
    db.add_all([project_a, project_b])
    db.flush()

    # Memberships
    m1 = ProjectMember(project_id=project_a.project_id, user_id=accepted_member.user_id, role=ProjectRole.EXPERT, status=MembershipStatus.ACCEPTED)
    m2 = ProjectMember(project_id=project_a.project_id, user_id=applied_member.user_id, role=ProjectRole.STUDENT, status=MembershipStatus.APPLIED)
    
    db.add_all([m1, m2])
    db.flush()

    # Context items
    milestone_a = Milestone(project_id=project_a.project_id, title="Milestone A")
    milestone_b = Milestone(project_id=project_b.project_id, title="Milestone B")
    db.add_all([milestone_a, milestone_b])
    
    db.commit()

    return {
        "sponsor": sponsor, "admin": admin, "accepted_member": accepted_member, 
        "applied_member": applied_member, "non_member": non_member,
        "project_a": project_a, "project_b": project_b,
        "milestone_a": milestone_a, "milestone_b": milestone_b
    }

def run_tests():
    print("=== Starting AI Context Selector Tests ===")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Cleanup any previous
    try:
        db.query(Milestone).delete()
        db.query(ProjectMember).delete()
        db.query(Project).delete()
        db.query(User).filter(User.email.like('%@test.com')).delete()
        db.commit()
    except:
        db.rollback()

    try:
        data = setup_test_data(db)
        
        # 1. Accepted member accessing own project
        req = [ContextRequestItem(type="project_summary")]
        res = get_project_context(db, data["project_a"].project_id, data["accepted_member"].user_id, req)
        assert res.decision == "ALLOWED", "Accepted member should be allowed"
        assert res.sensitivity == SensitivityLevel.PUBLIC

        # 2. Non-member denied
        res = get_project_context(db, data["project_a"].project_id, data["non_member"].user_id, req)
        assert res.decision == "BLOCKED"
        assert "Cross-project context access denied" in res.reason

        # 3. Applied member denied
        res = get_project_context(db, data["project_a"].project_id, data["applied_member"].user_id, req)
        assert res.decision == "BLOCKED"
        
        # 4. Member requesting another project's context denied
        req_cross = [ContextRequestItem(type="milestone", id=data["milestone_b"].milestone_id)]
        res = get_project_context(db, data["project_a"].project_id, data["accepted_member"].user_id, req_cross)
        assert res.decision == "BLOCKED"
        assert "Cross-project reference denied" in res.reason

        # 5. Sponsor accessing own project
        res = get_project_context(db, data["project_a"].project_id, data["sponsor"].user_id, req)
        assert res.decision == "ALLOWED"

        # 6. Admin access
        res = get_project_context(db, data["project_a"].project_id, data["admin"].user_id, req)
        assert res.decision == "ALLOWED"

        # 7. Confidential brief access
        req_conf = [ContextRequestItem(type="confidential_brief")]
        res = get_project_context(db, data["project_a"].project_id, data["accepted_member"].user_id, req_conf)
        assert res.decision == "ALLOWED"
        assert res.sensitivity == SensitivityLevel.CONFIDENTIAL
        assert "confidential_brief" in res.selected_context

        # 8. Restricted context
        req_rest = [ContextRequestItem(type="restricted_context")]
        res = get_project_context(db, data["project_a"].project_id, data["accepted_member"].user_id, req_rest)
        assert res.decision == "ALLOWED"
        assert res.sensitivity == SensitivityLevel.RESTRICTED
        
        print("ALL TESTS PASSED: Project isolation and context selection work perfectly.")
        
    finally:
        try:
            db.query(Milestone).delete()
            db.query(ProjectMember).delete()
            db.query(Project).delete()
            db.query(User).filter(User.email.like('%@test.com')).delete()
            db.commit()
        except:
            db.rollback()
        db.close()

if __name__ == "__main__":
    run_tests()
