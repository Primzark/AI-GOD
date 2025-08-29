from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from faker import Faker
from app.core.config import settings
from app.models.user import User
from app.models.post import Post
from app.models.item import Item
from app.auth.password import get_password_hash


def seed(db: Session) -> None:
    fake = Faker()
    # Admin
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            full_name="Admin",
            role="admin",
            is_superuser=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

    # User
    user = db.query(User).filter(User.email == "user@example.com").first()
    if not user:
        user = User(
            email="user@example.com",
            hashed_password=get_password_hash("user1234"),
            full_name="User",
            role="user",
        )
        db.add(user)
        db.commit()

    # Posts
    if db.query(Post).count() < 8:
        for i in range(8):
            p = Post(
                title=fake.sentence(nb_words=6),
                slug=f"post-{i+1}",
                content="\n\n".join(fake.paragraphs(nb=5)),
                tags="design,dev,news",
                author_id=admin.id,
            )
            db.add(p)
        db.commit()

    # Items
    if db.query(Item).count() < 6:
        for i in range(6):
            it = Item(
                name=f"Service {i+1}",
                description=fake.text(max_nb_chars=120),
                price=round(fake.pyfloat(left_digits=2, right_digits=2, positive=True) * 10, 2),
                tags="starter,popular,pro",
            )
            db.add(it)
        db.commit()


if __name__ == "__main__":
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    from sqlalchemy.orm import sessionmaker

    SessionLocal = sessionmaker(bind=engine)
    with SessionLocal() as db:
        seed(db)

