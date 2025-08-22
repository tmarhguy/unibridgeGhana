"""Database base configuration."""

from sqlalchemy.ext.declarative import declarative_base

# Create the base class for all models
Base = declarative_base()

# Import all models here so Alembic can detect them
from app.models.user import User  # noqa
