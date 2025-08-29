from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactIn, ContactOut

router = APIRouter()


@router.post("/", response_model=ContactOut)
def submit_contact(data: ContactIn, db: Session = Depends(get_db)):
    msg = ContactMessage(email=data.email, name=data.name, message=data.message)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    # Email sending stub: could integrate provider here
    return msg
