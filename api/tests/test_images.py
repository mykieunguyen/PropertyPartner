from fastapi.testclient import TestClient
from main import app
from queries.images import ImagesQueries

client = TestClient(app)


class FakeImagesQuery():
    def get(self, property_id: int):
        return (
            [
                {
                    "id": 1,
                    "picture_url": "string",
                    "property_id": property_id
                }
            ]
        )


def test_get_images():
    app.dependency_overrides[ImagesQueries] = FakeImagesQuery

    res = client.get("api/1/image")
    data = res.json()

    assert res.status_code == 200
    assert data == [
        {
            "id": 1,
            "picture_url": "string",
            "property_id": 1
        }
    ]
