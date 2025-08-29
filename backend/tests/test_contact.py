def test_contact_submit(client):
    r = client.post("/api/contact/", json={
        "email": "contact@example.com",
        "name": "Contact Person",
        "message": "I would love to talk!"
    })
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == "contact@example.com"
