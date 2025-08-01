"""Authentication schemas."""

from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)


class UserCreate(UserBase):
    """Schema for user creation."""
    password: str = Field(..., min_length=8, max_length=100)
    role: str = Field(default="STUDENT", pattern="^(STUDENT|UNIV_ADMIN)$")


class UserResponse(UserBase):
    """Schema for user response."""
    id: UUID
    role: str
    is_active: bool
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Token data schema."""
    user_id: Optional[str] = None
