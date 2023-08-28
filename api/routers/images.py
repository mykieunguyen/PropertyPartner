from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from authenticator import authenticator
from typing import List, Union
from models import ImageIn, ImageOut, Error, UnauthorizedEditorError
from queries.images import ImagesQueries
router = APIRouter()


@router.post("/api/{property_id}/image", response_model=Union[ImageOut, Error])
def create_image(
    property_id: int,
    image: ImageIn,
    images: ImagesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ImageOut, Error]:
    try:
        user_id = int(account_data['id'])
        return images.create(image, property_id, user_id)
    except UnauthorizedEditorError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unauthorized editor",
        )


@router.delete("/api/{property_id}/image/{image_id}",
               response_model=Union[bool, Error])
def delete_image(
    image_id: int,
    property_id: int,
    images: ImagesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    try:
        user_id = int(account_data['id'])
        return images.delete(image_id, property_id, user_id)
    except UnauthorizedEditorError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unauthorized editor",
        )


@router.get("/api/{property_id}/image",
            response_model=Union[List[ImageOut], Error])
def get_images(
    property_id: int,
    images: ImagesQueries = Depends(),
):
    return images.get(property_id)
