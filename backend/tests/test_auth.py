from app.auth.password import get_password_hash
from app.models.user import User


def test_register_and_login(client, db_session):
    # register
    r = client.post("/api/auth/register", json={
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Tester"
    })
    assert r.status_code == 200, r.text
    # login
    r = client.post("/api/auth/login", json={"email": "test@example.com", "password": "password123"})
    assert r.status_code == 200, r.text
    token = r.json()
    assert token["access_token"]
    assert token["refresh_token"]


def test_me_requires_auth(client, db_session):
    # seed user
    user = User(email="x@example.com", hashed_password=get_password_hash("passpass123"))
    db_session.add(user)
    db_session.commit()
    # login
    r = client.post("/api/auth/login", json={"email": "x@example.com", "password": "passpass123"})
    access = r.json()["access_token"]
    me = client.get("/api/users/me", headers={"Authorization": f"Bearer {access}"})
    assert me.status_code == 200
