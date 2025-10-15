"""Application schemas for UniBridge GH."""

from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel, Field, validator


class ApplicationBase(BaseModel):
    """Base application schema."""
    institution_id: UUID
    form_definition_id: UUID


class ApplicationCreate(ApplicationBase):
    """Schema for creating a new application."""
    pass


class ApplicationUpdate(BaseModel):
    """Schema for updating an application."""
    status: Optional[str] = Field(None, description="Application status")
    fee_paid: Optional[bool] = Field(None, description="Payment status")


class ApplicationResponse(ApplicationBase):
    """Schema for application response."""
    id: UUID
    user_id: UUID
    status: str
    decision: Optional[str] = None
    decision_at: Optional[datetime] = None
    submitted_at: Optional[datetime] = None
    fee_paid: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ApplicationAnswerBase(BaseModel):
    """Base application answer schema."""
    field_key: str = Field(..., description="Form field identifier")
    value: Any = Field(..., description="Answer value")


class ApplicationAnswerCreate(ApplicationAnswerBase):
    """Schema for creating an application answer."""
    pass


class ApplicationAnswerResponse(ApplicationAnswerBase):
    """Schema for application answer response."""
    id: UUID
    application_id: UUID
    updated_at: datetime

    class Config:
        from_attributes = True


class ApplicationSnapshotResponse(BaseModel):
    """Schema for application snapshot response."""
    id: UUID
    application_id: UUID
    snapshot_json: Dict[str, Any]
    hash_sha256: str
    created_at: datetime

    class Config:
        from_attributes = True


class ValidationError(BaseModel):
    """Schema for validation error."""
    field: str
    code: str
    message: str


class ValidationResult(BaseModel):
    """Schema for validation result."""
    valid: bool
    errors: List[ValidationError] = []


class ApplicationSummary(BaseModel):
    """Schema for application summary."""
    total_applications: int
    submitted_applications: int
    draft_applications: int
    under_review_applications: int
    decided_applications: int
    total_fees_paid: float
    pending_fees: float


class ApplicationProgress(BaseModel):
    """Schema for application progress."""
    application_id: UUID
    institution_name: str
    progress_percentage: int
    completed_sections: List[str]
    remaining_sections: List[str]
    validation_errors: List[ValidationError] = []


class ApplicationFilter(BaseModel):
    """Schema for application filtering."""
    status: Optional[str] = None
    institution_id: Optional[UUID] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    fee_paid: Optional[bool] = None


class ApplicationBulkAction(BaseModel):
    """Schema for bulk application actions."""
    application_ids: List[UUID]
    action: str = Field(..., description="Action to perform: submit, delete, validate")

    @validator('action')
    def validate_action(cls, v):
        allowed_actions = ['submit', 'delete', 'validate']
        if v not in allowed_actions:
            raise ValueError(f'Action must be one of: {allowed_actions}')
        return v


class ApplicationStatistics(BaseModel):
    """Schema for application statistics."""
    total_applications: int
    applications_by_status: Dict[str, int]
    applications_by_institution: Dict[str, int]
    average_completion_time: Optional[float] = None
    submission_rate: float
    acceptance_rate: Optional[float] = None 