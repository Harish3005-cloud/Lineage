import os
import sys
import uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.database import SessionLocal, engine, Base
from app.db.models.user import User, UserRole
from app.db.models.project import Project
from app.db.models.project_member import ProjectMember, MembershipStatus, ProjectRole
from app.services.ai_context_selector import ContextRequestItem
from app.services.ai_gateway_policy import evaluate_gateway_policy, PolicyDecision

def setup_data(db):
    user = User(name="PolicyUser", email="policy@test.com", password_hash="hash", age=30, role=UserRole.SPONSOR)
    non_member = User(name="NonMember", email="non@test.com", password_hash="hash", age=25, role=UserRole.STUDENT)
    db.add_all([user, non_member])
    db.flush()

    project = Project(title="Policy Project", sponsor_id=user.user_id, description="Confidential Desc")
    db.add(project)
    db.commit()

    return user, non_member, project

def run_tests():
    print("=== Starting AI Gateway Policy Engine Tests ===")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        db.query(ProjectMember).delete()
        db.query(Project).delete()
        db.query(User).filter(User.email.like('%@test.com')).delete()
        db.commit()
    except:
        db.rollback()

    try:
        user, non_member, project = setup_data(db)
        
        # 1. No authenticated user = BLOCK
        res = evaluate_gateway_policy(db, project.project_id, None, "default", "query", "text", [])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "No authenticated user" in res.reasons[0]

        # 2. No human owner (fake UUID) = BLOCK
        fake_uuid = uuid.uuid4()
        res = evaluate_gateway_policy(db, project.project_id, fake_uuid, "default", "query", "text", [])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "No human owner" in res.reasons[0]

        # 3. Non-member = BLOCK
        res = evaluate_gateway_policy(db, project.project_id, non_member.user_id, "default", "query", "text", [])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "access denied" in res.reasons[0]

        # 4. Cross-project context = BLOCK
        # Handled by selector, testing failure
        fake_milestone = ContextRequestItem(type="milestone", id=uuid.uuid4())
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "query", "text", [fake_milestone])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "Cross-project reference denied" in res.reasons[0]

        # 5. RESTRICTED context + external model = BLOCK
        rest_ctx = [ContextRequestItem(type="restricted_context")]
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "query", "text", rest_ctx)
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "RESTRICTED" in res.reasons[0]

        # 6. Secret detected = REDACT_AND_ALLOW
        secret_text = "API_KEY=12345"
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "query", secret_text, [])
        assert res.allowed
        assert res.decision == PolicyDecision.REDACT_AND_ALLOW
        assert len(res.redactions) > 0

        # 7. AI side effects = BLOCK
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "execute_side_effect", "text", [])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK

        # 8. AI approval of its own output = BLOCK
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "approve_output", "text", [])
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK

        # 9. External model not on allowlist = BLOCK
        conf_ctx = [ContextRequestItem(type="confidential_brief")]
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "query", "text", conf_ctx)
        assert not res.allowed
        assert res.decision == PolicyDecision.BLOCK
        assert "not approved" in res.reasons[0]

        # 10. Valid scoped request = ALLOW
        pub_ctx = [ContextRequestItem(type="project_summary")]
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "query", "text", pub_ctx)
        assert res.allowed
        assert res.decision == PolicyDecision.ALLOW

        # 11. Requests producing project changes = REVIEW_REQUIRED
        res = evaluate_gateway_policy(db, project.project_id, user.user_id, "default", "propose_change", "text", pub_ctx)
        assert res.allowed
        assert res.decision == PolicyDecision.REVIEW_REQUIRED

        print("ALL TESTS PASSED: Policy Engine perfectly evaluates all branches.")

    finally:
        try:
            db.query(ProjectMember).delete()
            db.query(Project).delete()
            db.query(User).filter(User.email.like('%@test.com')).delete()
            db.commit()
        except:
            db.rollback()
        db.close()

if __name__ == "__main__":
    run_tests()
