import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.database import SessionLocal, engine, Base
from app.db.models.user import User, UserRole
from app.db.models.project import Project
from app.db.models.ai_action import AIAction, AIActionStatus, SensitivityLevel
from app.db.models.ai_receipt import AIReceipt

def test_db_models():
    print("=== Starting AI Gateway DB Tests ===")
    
    # Ensure tables are created
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Clean up in case of previous failure
        db.query(User).filter(User.email == "owner@test.com").delete()
        db.commit()

        # Create a test user
        user = User(
            name="AI Owner",
            email="owner@test.com",
            password_hash="fake",
            age=30,
            role=UserRole.SPONSOR
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Create a test project
        project = Project(
            title="AI Test Project",
            sponsor_id=user.user_id
        )
        db.add(project)
        db.commit()
        db.refresh(project)

        # Create AIAction
        action = AIAction(
            project_id=project.project_id,
            human_owner_id=user.user_id,
            agent_name="CodeBot",
            model_name="gemini-3.1",
            request_text="Write a function",
            sensitivity_level=SensitivityLevel.INTERNAL,
            status=AIActionStatus.REQUESTED
        )
        db.add(action)
        db.commit()
        db.refresh(action)
        print(f"PASS: Created AIAction: {action.ai_action_id}")

        # Create AIReceipt
        receipt = AIReceipt(
            ai_action_id=action.ai_action_id,
            project_id=project.project_id,
            human_owner_id=user.user_id,
            agent_name=action.agent_name,
            model_name=action.model_name,
            request_hash="hash123",
            output_hash="hash456"
        )
        db.add(receipt)
        db.commit()
        db.refresh(receipt)
        print(f"PASS: Created AIReceipt: {receipt.receipt_id}")
        
        print("ALL TESTS PASSED: AIAction and AIReceipt models work perfectly.")
        
    finally:
        # Cleanup
        db.query(User).filter(User.email == "owner@test.com").delete()
        db.commit()
        db.close()

if __name__ == "__main__":
    test_db_models()
