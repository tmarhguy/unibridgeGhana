"""User service for authentication and user management."""

from typing import Optional
from uuid import UUID
import logging

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.context import CryptContext

from app.models.user import User
from app.schemas.auth import UserCreate


# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    """Service for user operations."""
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash."""
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def get_password_hash(password: str) -> str:
        """Generate password hash."""
        return pwd_context.hash(password)
    
    @staticmethod
    async def get_user(db: AsyncSession, user_id: UUID) -> Optional[User]:
        """Get user by ID."""
        result = await db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
        """Get user by email."""
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def create_user(db: AsyncSession, user: UserCreate) -> User:
        """Create a new user."""
        hashed_password = UserService.get_password_hash(user.password)
        db_user = User(
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            phone=user.phone,
            role=user.role,
            hashed_password=hashed_password
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user
    
    @staticmethod
    async def authenticate_user(db: AsyncSession, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password."""
        logging.info(f"Authenticating user with email: {email}")
        user = await UserService.get_user_by_email(db, email)
        if not user:
            logging.warning(f"User with email {email} not found.")
            return None
        if not UserService.verify_password(password, user.hashed_password):
            logging.warning(f"Password verification failed for user {email}.")
            return None
        logging.info(f"User {email} authenticated successfully.")
        return user
