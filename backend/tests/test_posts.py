from app.auth.password import get_password_hash
from app.models.user import User


def test_posts_crud_admin(client, db_session):
    admin = User(email="admin@x.com", hashed_password=get_password_hash("adminpass123"), role="admin", is_superuser=True)
    db_session.add(admin)
    db_session.commit()
    r = client.post("/api/auth/login", json={"email": "admin@x.com", "password": "adminpass123"})
    access = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {access}"}
    # create
    c = client.post("/api/posts/", json={"title": "Hello", "slug": "hello", "content": "World", "tags": "demo"}, headers=headers)
    assert c.status_code == 200
    pid = c.json()["id"]
    # list
    l = client.get("/api/posts/")
    assert l.status_code == 200
    # update
    u = client.put(f"/api/posts/{pid}", json={"title": "Hello 2"}, headers=headers)
    assert u.status_code == 200
    # delete
    d = client.delete(f"/api/posts/{pid}", headers=headers)
    assert d.status_code == 200
