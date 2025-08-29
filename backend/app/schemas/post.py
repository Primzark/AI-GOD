from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    slug: str
    content: str
    tags: str = ""


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    tags: str | None = None


class PostOut(PostBase):
    id: int

    class Config:
        from_attributes = True
