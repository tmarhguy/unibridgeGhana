"""Database models for UniBridge GH."""

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()


class User(Base):
    """User model for authentication."""
    
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20), unique=True, nullable=False, index=True)
    role = Column(
        String(20),
        CheckConstraint("role IN ('STUDENT', 'UNIV_ADMIN')"),
        nullable=False
    )
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    student_profile = relationship(
        "StudentProfile", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    applications = relationship(
        "Application", back_populates="user", cascade="all, delete-orphan"
    )
    documents = relationship(
        "Document", back_populates="user", cascade="all, delete-orphan"
    )
    activity_logs = relationship(
        "ActivityLog", back_populates="user", cascade="all, delete-orphan"
    )


class StudentProfile(Base):
    """Student profile information."""
    
    __tablename__ = "student_profiles"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    middle_name = Column(String(100))
    date_of_birth = Column(DateTime)
    gender = Column(String(20))
    address_line = Column(Text)
    region = Column(String(100))
    high_school_name = Column(String(200))
    graduation_year = Column(Integer)
    phone_number = Column(String(20))
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="student_profile")


class Institution(Base):
    """University/institution model."""
    
    __tablename__ = "institutions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    short_code = Column(String(20), unique=True, nullable=False)
    status = Column(
        String(20),
        CheckConstraint("status IN ('ACTIVE', 'TEST')"),
        nullable=False,
        default="ACTIVE"
    )
    description = Column(Text)
    contact_email = Column(String(255))
    website_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    form_definitions = relationship(
        "FormDefinition", back_populates="institution", cascade="all, delete-orphan"
    )
    applications = relationship(
        "Application", back_populates="institution"
    )


class FormDefinition(Base):
    """Form definition using JSON schema."""
    
    __tablename__ = "form_definitions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    institution_id = Column(UUID(as_uuid=True), ForeignKey("institutions.id"), nullable=False)
    version = Column(Integer, nullable=False, default=1)
    status = Column(
        String(20),
        CheckConstraint("status IN ('ACTIVE', 'DEPRECATED')"),
        nullable=False,
        default="ACTIVE"
    )
    title = Column(String(200), nullable=False)
    json_schema = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        UniqueConstraint("institution_id", "version", name="uq_institution_version"),
    )
    
    # Relationships
    institution = relationship("Institution", back_populates="form_definitions")
    applications = relationship("Application", back_populates="form_definition")


class Application(Base):
    """Student application to an institution."""
    
    __tablename__ = "applications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    institution_id = Column(UUID(as_uuid=True), ForeignKey("institutions.id"), nullable=False)
    form_definition_id = Column(UUID(as_uuid=True), ForeignKey("form_definitions.id"), nullable=False)
    status = Column(
        String(20),
        CheckConstraint("status IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'DECIDED')"),
        nullable=False,
        default="DRAFT"
    )
    decision = Column(
        String(20),
        CheckConstraint("decision IN ('ADMIT', 'REJECT') OR decision IS NULL")
    )
    decision_at = Column(DateTime(timezone=True))
    submitted_at = Column(DateTime(timezone=True))
    fee_paid = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    __table_args__ = (
        UniqueConstraint("user_id", "institution_id", name="uq_user_institution"),
    )
    
    # Relationships
    user = relationship("User", back_populates="applications")
    institution = relationship("Institution", back_populates="applications")
    form_definition = relationship("FormDefinition", back_populates="applications")
    answers = relationship(
        "ApplicationAnswer", back_populates="application", cascade="all, delete-orphan"
    )
    snapshot = relationship(
        "ApplicationSnapshot", back_populates="application", uselist=False, cascade="all, delete-orphan"
    )
    documents = relationship(
        "Document", back_populates="application", cascade="all, delete-orphan"
    )


class ApplicationAnswer(Base):
    """Individual answers to form fields."""
    
    __tablename__ = "application_answers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id"), nullable=False)
    field_key = Column(String(100), nullable=False)
    value = Column(JSONB)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    __table_args__ = (
        UniqueConstraint("application_id", "field_key", name="uq_application_field"),
    )
    
    # Relationships
    application = relationship("Application", back_populates="answers")


class ApplicationSnapshot(Base):
    """Immutable snapshot of submitted application."""
    
    __tablename__ = "application_snapshots"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id"), unique=True, nullable=False)
    snapshot_json = Column(JSONB, nullable=False)
    hash_sha256 = Column(String(64), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    application = relationship("Application", back_populates="snapshot")


class Document(Base):
    """Document storage metadata."""
    
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id"))
    original_filename = Column(String(255), nullable=False)
    storage_path = Column(String(500), nullable=False)
    mime_type = Column(String(100), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    sha256_hash = Column(String(64))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="documents")
    application = relationship("Application", back_populates="documents")


class ActivityLog(Base):
    """Activity logging for audit trail."""
    
    __tablename__ = "activity_log"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    action = Column(String(50), nullable=False)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(UUID(as_uuid=True))
    details = Column(JSONB)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="activity_logs")
