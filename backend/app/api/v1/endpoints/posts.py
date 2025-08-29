from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate, PostOut

router = APIRouter()


@router.get("/", response_model=List[PostOut])
def list_posts(db: Session = Depends(get_db)):
    return db.query(Post).order_by(Post.id.desc()).all()


@router.get("/{post_id}", response_model=PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=PostOut)
def create_post(data: PostCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    post = Post(title=data.title, slug=data.slug, content=data.content, tags=data.tags, author_id=admin.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{post_id}", response_model=PostOut)
def update_post(post_id: int, data: PostUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if data.title is not None:
        post.title = data.title
    if data.content is not None:
        post.content = data.content
    if data.tags is not None:
        post.tags = data.tags
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "deleted"}
