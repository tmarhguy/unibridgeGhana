"""Applications router for UniBridge GH."""

from typing import Any, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.routers.auth import get_current_user_dependency
from app.schemas.auth import UserResponse
from app.schemas.applications import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationUpdate,
    ApplicationAnswerCreate,
    ApplicationAnswerResponse,
    ApplicationSnapshotResponse
)
from app.services.applications import ApplicationService

router = APIRouter()


@router.get("/", response_model=List[ApplicationResponse])
async def list_applications(
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session),
    status_filter: Optional[str] = None,
    institution_id: Optional[UUID] = None
) -> Any:
    """List user applications with optional filtering."""
    applications = await ApplicationService.get_user_applications(
        session, current_user.id, status_filter, institution_id
    )
    return applications


@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(
    application_data: ApplicationCreate,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Create a new application."""
    # Check if user already has an application for this institution
    existing_app = await ApplicationService.get_user_institution_application(
        session, current_user.id, application_data.institution_id
    )
    if existing_app:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application for this institution already exists"
        )
    
    application = await ApplicationService.create_application(
        session, current_user.id, application_data
    )
    return application


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(
    application_id: UUID,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Get specific application details."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Ensure user can only access their own applications
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    return application


@router.put("/{application_id}", response_model=ApplicationResponse)
async def update_application(
    application_id: UUID,
    application_data: ApplicationUpdate,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Update application details."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if application.status == "SUBMITTED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot modify submitted application"
        )
    
    updated_application = await ApplicationService.update_application(
        session, application_id, application_data
    )
    return updated_application


@router.post("/{application_id}/answers", response_model=ApplicationAnswerResponse)
async def save_answer(
    application_id: UUID,
    answer_data: ApplicationAnswerCreate,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Save an answer to an application field."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if application.status == "SUBMITTED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot modify submitted application"
        )
    
    answer = await ApplicationService.save_answer(
        session, application_id, answer_data
    )
    return answer


@router.post("/{application_id}/validate")
async def validate_application(
    application_id: UUID,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Validate application before submission."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    validation_result = await ApplicationService.validate_application(
        session, application_id
    )
    return validation_result


@router.post("/{application_id}/submit", response_model=ApplicationResponse)
async def submit_application(
    application_id: UUID,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Submit application (creates immutable snapshot)."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if application.status == "SUBMITTED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application already submitted"
        )
    
    # Validate application before submission
    validation_result = await ApplicationService.validate_application(
        session, application_id
    )
    if not validation_result["valid"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application validation failed",
            headers={"X-Validation-Errors": str(validation_result["errors"])}
        )
    
    submitted_application = await ApplicationService.submit_application(
        session, application_id
    )
    return submitted_application


@router.get("/{application_id}/snapshot", response_model=ApplicationSnapshotResponse)
async def get_application_snapshot(
    application_id: UUID,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Get application snapshot (immutable version)."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    snapshot = await ApplicationService.get_application_snapshot(session, application_id)
    if not snapshot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application snapshot not found"
        )
    
    return snapshot


@router.delete("/{application_id}")
async def delete_application(
    application_id: UUID,
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Delete application (only if not submitted)."""
    application = await ApplicationService.get_application(session, application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if application.status == "SUBMITTED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete submitted application"
        )
    
    await ApplicationService.delete_application(session, application_id)
    return {"message": "Application deleted successfully"}
