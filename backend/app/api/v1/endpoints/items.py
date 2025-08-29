from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate, ItemOut

router = APIRouter()


@router.get("/", response_model=List[ItemOut])
def list_items(q: str | None = Query(None), db: Session = Depends(get_db)):
    query = db.query(Item)
    if q:
        like = f"%{q}%"
        query = query.filter(Item.name.ilike(like))
    return query.order_by(Item.id.desc()).all()


@router.get("/{item_id}", response_model=ItemOut)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.post("/", response_model=ItemOut)
def create_item(data: ItemCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = Item(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=ItemOut)
def update_item(item_id: int, data: ItemUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = db.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(item, k, v)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    item = db.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "deleted"}
