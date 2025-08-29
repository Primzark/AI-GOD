from pydantic import BaseModel, EmailStr


class ContactIn(BaseModel):
    email: EmailStr
    name: str
    message: str


class ContactOut(ContactIn):
    id: int

    class Config:
        from_attributes = True
