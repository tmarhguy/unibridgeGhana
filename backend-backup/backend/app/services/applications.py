"""Application service for UniBridge GH."""

import hashlib
import json
from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID

from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models import Application, ApplicationAnswer, ApplicationSnapshot, Institution
from app.schemas.applications import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationAnswerCreate,
    ValidationError,
    ValidationResult
)


class ApplicationService:
    """Service for application operations."""

    @staticmethod
    async def get_user_applications(
        session: AsyncSession,
        user_id: UUID,
        status_filter: Optional[str] = None,
        institution_id: Optional[UUID] = None
    ) -> List[Application]:
        """Get user applications with optional filtering."""
        query = select(Application).where(Application.user_id == user_id)
        
        if status_filter:
            query = query.where(Application.status == status_filter)
        
        if institution_id:
            query = query.where(Application.institution_id == institution_id)
        
        query = query.order_by(Application.created_at.desc())
        result = await session.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_application(session: AsyncSession, application_id: UUID) -> Optional[Application]:
        """Get application by ID."""
        query = select(Application).where(Application.id == application_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_user_institution_application(
        session: AsyncSession, user_id: UUID, institution_id: UUID
    ) -> Optional[Application]:
        """Get user's application for specific institution."""
        query = select(Application).where(
            and_(Application.user_id == user_id, Application.institution_id == institution_id)
        )
        result = await session.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_application(
        session: AsyncSession, user_id: UUID, application_data: ApplicationCreate
    ) -> Application:
        """Create a new application."""
        application = Application(
            user_id=user_id,
            institution_id=application_data.institution_id,
            form_definition_id=application_data.form_definition_id,
            status="DRAFT"
        )
        session.add(application)
        await session.commit()
        await session.refresh(application)
        return application

    @staticmethod
    async def update_application(
        session: AsyncSession, application_id: UUID, application_data: ApplicationUpdate
    ) -> Application:
        """Update application details."""
        application = await ApplicationService.get_application(session, application_id)
        if not application:
            raise ValueError("Application not found")

        # Update fields
        for field, value in application_data.dict(exclude_unset=True).items():
            setattr(application, field, value)

        application.updated_at = datetime.utcnow()
        await session.commit()
        await session.refresh(application)
        return application

    @staticmethod
    async def save_answer(
        session: AsyncSession, application_id: UUID, answer_data: ApplicationAnswerCreate
    ) -> ApplicationAnswer:
        """Save an answer to an application field."""
        # Check if answer already exists
        existing_answer = await session.execute(
            select(ApplicationAnswer).where(
                and_(
                    ApplicationAnswer.application_id == application_id,
                    ApplicationAnswer.field_key == answer_data.field_key
                )
            )
        )
        existing_answer = existing_answer.scalar_one_or_none()

        if existing_answer:
            # Update existing answer
            existing_answer.value = answer_data.value
            existing_answer.updated_at = datetime.utcnow()
            await session.commit()
            await session.refresh(existing_answer)
            return existing_answer
        else:
            # Create new answer
            answer = ApplicationAnswer(
                application_id=application_id,
                field_key=answer_data.field_key,
                value=answer_data.value
            )
            session.add(answer)
            await session.commit()
            await session.refresh(answer)
            return answer

    @staticmethod
    async def validate_application(session: AsyncSession, application_id: UUID) -> ValidationResult:
        """Validate application before submission."""
        application = await ApplicationService.get_application(session, application_id)
        if not application:
            return ValidationResult(valid=False, errors=[
                ValidationError(field="application", code="NOT_FOUND", message="Application not found")
            ])

        errors = []

        # Get all answers for this application
        answers_query = select(ApplicationAnswer).where(ApplicationAnswer.application_id == application_id)
        answers_result = await session.execute(answers_query)
        answers = answers_result.scalars().all()

        # Basic validation rules
        if not answers:
            errors.append(ValidationError(
                field="answers", code="EMPTY", message="Application has no answers"
            ))

        # Check for required fields (this would be based on form definition)
        # For now, we'll do basic validation
        required_fields = ["personal_statement", "academic_background"]
        for field in required_fields:
            field_answer = next((a for a in answers if a.field_key == field), None)
            if not field_answer or not field_answer.value:
                errors.append(ValidationError(
                    field=field, code="REQUIRED", message=f"Field {field} is required"
                ))

        # Validate text length for essays
        for answer in answers:
            if answer.field_key == "personal_statement":
                if isinstance(answer.value, str) and len(answer.value) < 200:
                    errors.append(ValidationError(
                        field="personal_statement", code="MIN_LENGTH", 
                        message="Personal statement must be at least 200 characters"
                    ))

        return ValidationResult(valid=len(errors) == 0, errors=errors)

    @staticmethod
    async def submit_application(session: AsyncSession, application_id: UUID) -> Application:
        """Submit application and create immutable snapshot."""
        application = await ApplicationService.get_application(session, application_id)
        if not application:
            raise ValueError("Application not found")

        # Validate application
        validation_result = await ApplicationService.validate_application(session, application_id)
        if not validation_result.valid:
            raise ValueError(f"Application validation failed: {validation_result.errors}")

        # Get all answers for snapshot
        answers_query = select(ApplicationAnswer).where(ApplicationAnswer.application_id == application_id)
        answers_result = await session.execute(answers_query)
        answers = answers_result.scalars().all()

        # Create snapshot data
        snapshot_data = {
            "application_id": str(application_id),
            "user_id": str(application.user_id),
            "institution_id": str(application.institution_id),
            "form_definition_id": str(application.form_definition_id),
            "answers": {answer.field_key: answer.value for answer in answers},
            "submitted_at": datetime.utcnow().isoformat()
        }

        # Create SHA256 hash of snapshot
        snapshot_json = json.dumps(snapshot_data, sort_keys=True, separators=(',', ':'))
        snapshot_hash = hashlib.sha256(snapshot_json.encode()).hexdigest()

        # Create snapshot record
        snapshot = ApplicationSnapshot(
            application_id=application_id,
            snapshot_json=snapshot_data,
            hash_sha256=snapshot_hash
        )
        session.add(snapshot)

        # Update application status
        application.status = "SUBMITTED"
        application.submitted_at = datetime.utcnow()

        await session.commit()
        await session.refresh(application)
        return application

    @staticmethod
    async def get_application_snapshot(
        session: AsyncSession, application_id: UUID
    ) -> Optional[ApplicationSnapshot]:
        """Get application snapshot."""
        query = select(ApplicationSnapshot).where(ApplicationSnapshot.application_id == application_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def delete_application(session: AsyncSession, application_id: UUID) -> None:
        """Delete application."""
        application = await ApplicationService.get_application(session, application_id)
        if not application:
            raise ValueError("Application not found")

        await session.delete(application)
        await session.commit()

    @staticmethod
    async def get_application_progress(
        session: AsyncSession, application_id: UUID
    ) -> Dict[str, Any]:
        """Get application progress information."""
        application = await ApplicationService.get_application(session, application_id)
        if not application:
            return {"error": "Application not found"}

        # Get answers
        answers_query = select(ApplicationAnswer).where(ApplicationAnswer.application_id == application_id)
        answers_result = await session.execute(answers_query)
        answers = answers_result.scalars().all()

        # Calculate progress (this would be based on form definition)
        total_fields = 10  # This should come from form definition
        completed_fields = len(answers)
        progress_percentage = min(100, int((completed_fields / total_fields) * 100))

        return {
            "application_id": str(application_id),
            "status": application.status,
            "progress_percentage": progress_percentage,
            "completed_fields": completed_fields,
            "total_fields": total_fields,
            "last_updated": application.updated_at.isoformat() if application.updated_at else None
        }

    @staticmethod
    async def get_user_application_summary(session: AsyncSession, user_id: UUID) -> Dict[str, Any]:
        """Get user's application summary."""
        applications = await ApplicationService.get_user_applications(session, user_id)
        
        total = len(applications)
        submitted = len([a for a in applications if a.status == "SUBMITTED"])
        draft = len([a for a in applications if a.status == "DRAFT"])
        under_review = len([a for a in applications if a.status == "UNDER_REVIEW"])
        decided = len([a for a in applications if a.status == "DECIDED"])
        
        total_fees = sum(150 for a in applications if a.fee_paid)  # Assuming 150 GHS per application
        pending_fees = sum(150 for a in applications if not a.fee_paid)

        return {
            "total_applications": total,
            "submitted_applications": submitted,
            "draft_applications": draft,
            "under_review_applications": under_review,
            "decided_applications": decided,
            "total_fees_paid": total_fees,
            "pending_fees": pending_fees
        } 