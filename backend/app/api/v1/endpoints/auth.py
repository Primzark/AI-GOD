from datetime import datetime, timedelta, timezone
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserLogin, Token, UserOut
from app.models.user import User
from app.models.token import RefreshToken
from app.auth.password import get_password_hash, verify_password
from app.core.security import create_access_token, create_refresh_token
from app.core.config import settings

router = APIRouter()
from app.main import limiter


@router.post("/register", response_model=UserOut)
@limiter.limit(settings.RATE_LIMIT_AUTH)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role="user",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
@limiter.limit(settings.RATE_LIMIT_AUTH)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = create_access_token(str(user.id), extra={"role": user.role})
    jti = str(uuid.uuid4())
    refresh = create_refresh_token(str(user.id), token_id=jti)
    exp = datetime.now(timezone.utc) + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    db.add(RefreshToken(jti=jti, user_id=user.id, revoked=False, expires_at=exp))
    db.commit()
    return Token(access_token=access, refresh_token=refresh)


from fastapi.security import OAuth2PasswordRequestForm


@router.post("/token", response_model=Token, include_in_schema=False)
@limiter.limit(settings.RATE_LIMIT_AUTH)
def login_via_oauth(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login(UserLogin(email=form_data.username, password=form_data.password), db)


from app.auth.jwt import decode_token


@router.post("/refresh", response_model=Token)
def refresh(token: str, db: Session = Depends(get_db)):
    payload = decode_token(token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    jti = payload.get("jti")
    user_id = payload.get("sub")
    rt = db.query(RefreshToken).filter(RefreshToken.jti == jti, RefreshToken.user_id == int(user_id)).first()
    if not rt or rt.revoked or rt.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Refresh token revoked or expired")
    # rotate refresh token
    rt.revoked = True
    jti_new = str(uuid.uuid4())
    exp = datetime.now(timezone.utc) + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    db.add(RefreshToken(jti=jti_new, user_id=int(user_id), revoked=False, expires_at=exp))
    db.commit()
    access = create_access_token(str(user_id))
    refresh_new = create_refresh_token(str(user_id), token_id=jti_new)
    return Token(access_token=access, refresh_token=refresh_new)


@router.post("/logout")
def logout(token: str, db: Session = Depends(get_db)):
    payload = decode_token(token)
    if payload and payload.get("type") == "refresh":
        jti = payload.get("jti")
        db.query(RefreshToken).filter(RefreshToken.jti == jti).update({RefreshToken.revoked: True})
        db.commit()
    return {"message": "Logged out"}
