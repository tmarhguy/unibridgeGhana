"""Authentication router for UniBridge GH."""

from datetime import datetime, timedelta
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.session import get_session
from app.schemas.auth import Token, UserCreate, UserResponse
from app.services.user import UserService

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def get_current_user_dependency(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session)
) -> UserResponse:
    """Get current user from JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        settings = get_settings()
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await UserService.get_user(session, user_id)
    if user is None:
        raise credentials_exception
    
    return UserResponse.from_orm(user)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_create: UserCreate,
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Register a new user."""
    # Check if user already exists
    existing_user = await UserService.get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create user
    user = await UserService.create_user(session, user_create)
    return user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Login user and return access token."""
    # Authenticate user
    user = await UserService.authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    settings = get_settings()
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    current_user: UserResponse = Depends(get_current_user_dependency)
) -> Any:
    """Get current user information."""
    return current_user


@router.post("/refresh", response_model=Token)
async def refresh_token(
    current_user: UserResponse = Depends(get_current_user_dependency),
    session: AsyncSession = Depends(get_session)
) -> Any:
    """Refresh access token."""
    settings = get_settings()
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(current_user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
async def logout() -> Any:
    """Logout user (client-side token removal)."""
    return {"message": "Successfully logged out"}
