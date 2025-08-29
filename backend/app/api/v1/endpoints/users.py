from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_current_active_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserOut)
def read_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.put("/me", response_model=UserOut)
def update_me(update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    if update.full_name is not None:
        current_user.full_name = update.full_name
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
