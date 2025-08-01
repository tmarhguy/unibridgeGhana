"""Profile router - placeholder."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_profile():
    """Get user profile - placeholder."""
    return {"message": "Profile endpoint - coming soon"}
