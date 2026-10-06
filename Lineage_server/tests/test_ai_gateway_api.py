import os
import sys
import uuid
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.main import app
from app.db.database import SessionLocal, engine, Base
from app.db.models.user import User, UserRole
from app.db.models.project import Project
from app.db.models.project_member import ProjectMember, MembershipStatus, ProjectRole
from app.db.models.ai_action import AIAction
from app.db.models.ai_receipt import AIReceipt
from app.core.security import create_access_token

client = TestClient(app)

def setup_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        db.query(AIReceipt).delete()
        db.query(AIAction).delete()
        db.query(ProjectMember).delete()
        db.query(Project).delete()
        db.query(User).filter(User.email.like('%@gatewaytest.com')).delete()
        db.commit()
    except:
        db.rollback()

    user = User(name="Gateway User", email="owner@gatewaytest.com", password_hash="hash", age=30, role=UserRole.SPONSOR)
    non_member = User(name="Non Member", email="non@gatewaytest.com", password_hash="hash", age=25, role=UserRole.STUDENT)
    db.add_all([user, non_member])
    db.flush()

    project = Project(title="Gateway Project", sponsor_id=user.user_id, description="Confidential Desc")
    db.add(project)
    db.commit()

    db.refresh(user)
    db.refresh(non_member)
    db.refresh(project)

    user_token = create_access_token({"sub": str(user.user_id)})
    non_member_token = create_access_token({"sub": str(non_member.user_id)})
    
    db.close()
    return user, non_member, project, user_token, non_member_token

def test_api():
    print("=== Starting AI Gateway API Tests ===")
    user, non_member, project, user_token, non_member_token = setup_db()

    # 1. Missing JWT (401)
    res = client.post("/api/gateway/request", json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Test",
        "selected_context": [],
        "model": "default"
    })
    assert res.status_code == 401, "Missing JWT should return 401"

    # 2. Missing human owner (403)
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(uuid.uuid4()), # Mismatch
        "task": "Test",
        "selected_context": [],
        "model": "default"
    })
    assert res.status_code == 403, "Mismatch human owner should return 403"

    # 3. Non-member access -> BLOCKED
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {non_member_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(non_member.user_id),
        "task": "Test",
        "selected_context": [],
        "model": "default"
    })
    assert res.status_code == 200
    assert res.json()["status"] == "BLOCKED"
    assert "access denied" in res.json()["reasons"][0]

    # 4. Valid Request -> ALLOWED, Receipt Created, Mock Response
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Please summarize milestone 1",
        "selected_context": [{"type": "project_summary"}],
        "model": "default"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "PENDING_REVIEW"
    assert data["decision"] == "ALLOW" or data["decision"] == "REVIEW_REQUIRED"
    assert "completed the data collection" in data["output"] # Successful mock response
    assert data["receipt_id"] is not None # Receipt creation
    assert data["ai_action_id"] is not None

    # 5. Secret redaction & REDACT_AND_ALLOW
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Here is API_KEY=123456",
        "selected_context": [],
        "model": "default"
    })
    data = res.json()
    assert data["status"] == "PENDING_REVIEW"
    assert data["decision"] == "REDACT_AND_ALLOW" or data["decision"] == "REVIEW_REQUIRED" # Wait, propose_change upgrades it to REVIEW_REQUIRED, but redactions will be populated
    assert len(data["redactions"]) > 0

    # 6. Restricted context -> BLOCKED
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Test",
        "selected_context": [{"type": "restricted_context"}],
        "model": "default"
    })
    data = res.json()
    assert data["status"] == "BLOCKED"
    assert "RESTRICTED" in data["reasons"][0]

    # 7. Blocked model (confidential + default) -> BLOCKED
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Test",
        "selected_context": [{"type": "confidential_brief"}],
        "model": "default" # default model not allowed for confidential
    })
    data = res.json()
    assert data["status"] == "BLOCKED"
    assert "not approved" in data["reasons"][0]

    # 8. Cross-project context -> BLOCKED
    res = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Test",
        "selected_context": [{"type": "milestone", "id": str(uuid.uuid4())}], # fake milestone
        "model": "default"
    })
    data = res.json()
    assert data["status"] == "BLOCKED"
    assert "Cross-project reference denied" in data["reasons"][0]

    # --- Human Review Tests ---
    action_id = data["ai_action_id"]
    
    # 9. unauthorized user attempts approval
    res = client.post(f"/api/gateway/{action_id}/approve", headers={"Authorization": f"Bearer {non_member_token}"})
    assert res.status_code == 403, "Unauthorized user should be rejected"

    # 10. AI cannot approve (since token must map to human, if AI tries without human token it fails at auth)
    # 11. rejection reason required
    res = client.post(f"/api/gateway/{action_id}/reject", headers={"Authorization": f"Bearer {user_token}"}, json={})
    assert res.status_code == 422 or res.status_code == 400, "Rejection reason required"
    
    res = client.post(f"/api/gateway/{action_id}/reject", headers={"Authorization": f"Bearer {user_token}"}, json={"reason": ""})
    assert res.status_code == 400, "Rejection reason required"

    # 12. owner rejects
    res = client.post(f"/api/gateway/{action_id}/reject", headers={"Authorization": f"Bearer {user_token}"}, json={"reason": "Not quite right"})
    assert res.status_code == 200
    r_data = res.json()
    assert r_data["status"] == "REJECTED"
    assert r_data["decision"] == "REJECTED"
    assert r_data["reason"] == "Not quite right"
    
    # 13. already rejected action
    res = client.post(f"/api/gateway/{action_id}/reject", headers={"Authorization": f"Bearer {user_token}"}, json={"reason": "Again"})
    assert res.status_code == 400
    assert "not PENDING_REVIEW" in res.json()["detail"]

    # 14. owner approves (need a new PENDING_REVIEW action)
    res2 = client.post("/api/gateway/request", headers={"Authorization": f"Bearer {user_token}"}, json={
        "project_id": str(project.project_id),
        "agent_name": "TestBot",
        "human_owner_id": str(user.user_id),
        "task": "Please summarize milestone 1",
        "selected_context": [{"type": "project_summary"}],
        "model": "default"
    })
    action_id2 = res2.json()["ai_action_id"]
    
    res_app = client.post(f"/api/gateway/{action_id2}/approve", headers={"Authorization": f"Bearer {user_token}"})
    assert res_app.status_code == 200
    a_data = res_app.json()
    assert a_data["status"] == "APPROVED"
    assert a_data["decision"] == "APPROVED"

    # 15. already approved action
    res_app2 = client.post(f"/api/gateway/{action_id2}/approve", headers={"Authorization": f"Bearer {user_token}"})
    assert res_app2.status_code == 400
    assert "not PENDING_REVIEW" in res_app2.json()["detail"]

    print("ALL API TESTS PASSED")

if __name__ == "__main__":
    test_api()
