from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str
    description: str = ""
    price: float = 0
    active: bool = True
    tags: str = ""


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    active: bool | None = None
    tags: str | None = None


class ItemOut(ItemBase):
    id: int

    class Config:
        from_attributes = True
