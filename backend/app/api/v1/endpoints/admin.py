from fastapi import APIRouter, Depends
from app.api.deps import get_current_admin
from app.schemas.common import Message

router = APIRouter()


@router.get("/health", response_model=Message)
def admin_health(_: str = Depends(get_current_admin)):
    return {"message": "admin ok"}
