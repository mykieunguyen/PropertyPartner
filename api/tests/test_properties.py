from fastapi.testclient import TestClient
from main import app
from queries.properties import PropertiesQueries

client = TestClient(app)


class FakePropertiesQuery():
    def get_properties(self):
        return [
            {
                "id": 0,
                "price": 0,
                "city": "string",
                "bedrooms": 0,
                "bathrooms": 0,
                "address": "string",
                "sq_footage": 0,
                "year_built": 0,
                "multistory": True,
                "new_build": True,
                "state": "string",
                "user_id": 0
            }
            ]
    def get_property(self, property_id: int):
        return {
            "id": property_id,
            "price": 0,
            "city": "string",
            "bedrooms": 0,
            "bathrooms": 0,
            "address": "string",
            "sq_footage": 0,
            "year_built": 0,
            "multistory": True,
            "new_build": True,
            "state": "string",
            "owner": {
                "id": 0,
                "email": "string",
                "first_name": "string",
                "last_name": "string",
                "phone_number": "string"
            }
        }


def test_get_properties():
    app.dependency_overrides[PropertiesQueries] = FakePropertiesQuery
    res = client.get("/api/properties")
    data = res.json()

    assert res.status_code == 200
    assert data == [
            {
                "id": 0,
                "price": 0,
                "city": "string",
                "bedrooms": 0,
                "bathrooms": 0,
                "address": "string",
                "sq_footage": 0,
                "year_built": 0,
                "multistory": True,
                "new_build": True,
                "state": "string",
                "user_id": 0
            }
            ]


def test_get_property_detail():
    app.dependency_overrides[PropertiesQueries] = FakePropertiesQuery
    res = client.get("/api/properties/1")
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 1,
        "price": 0,
        "city": "string",
        "bedrooms": 0,
        "bathrooms": 0,
        "address": "string",
        "sq_footage": 0,
        "year_built": 0,
        "multistory": True,
        "new_build": True,
        "state": "string",
        "owner": {
            "id": 0,
            "email": "string",
            "first_name": "string",
            "last_name": "string",
            "phone_number": "string"
        }
    }
