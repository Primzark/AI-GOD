from fastapi import APIRouter
from .endpoints import auth, users, posts, items, contact, admin


api_router = APIRouter(prefix="/api")

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
