from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
)
from authenticator import authenticator
from typing import List, Union, Optional
from models import PropertiesOut, Error, PropertiesIn, UnauthorizedEditorError, PropertyWithOwner
from queries.properties import PropertiesQueries
router = APIRouter()


@router.get("/api/properties/mine", response_model=Union[List[PropertiesOut], Error])
def get_user_properties(
    properties: PropertiesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[List[PropertiesOut], Error]:
    user_id = int(account_data["id"])
    return properties.get_my_properties(user_id)

@router.get("/api/properties", response_model=Union[List[PropertiesOut], Error])
def get_properties(
    properties: PropertiesQueries = Depends()
):
    return properties.get_properties()


@router.post("/api/properties", response_model=Union[PropertiesOut, Error])
def create_property(
    property: PropertiesIn,
    properties: PropertiesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return properties.create_property(property, account_data)


@router.get("/api/properties/{property_id}", response_model=Optional[PropertyWithOwner])
def get_property_detail(
    response: Response,
    property_id: int,
    properties: PropertiesQueries = Depends(),
) -> PropertyWithOwner:

    property = properties.get_property(property_id)
    if property is None:
        response.status_code = 404
    return property


@router.put("/api/properties/{property_id}", response_model=Union[PropertiesOut, Error])
def edit_property(
    property_id: int,
    property: PropertiesIn,
    properties: PropertiesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[PropertiesOut, Error]:
    user_id = int(account_data['id'])
    try:
        return properties.update_property(property_id, property, user_id=user_id)
    except UnauthorizedEditorError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unauthorized editor",
        )

@router.delete("/api/properties/{property_id}", response_model=Union[bool, Error])
def delete_property(
    property_id: int,
    properties: PropertiesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    user_id = int(account_data['id'])
    try:
        property = properties.delete(property_id, user_id)
        if property is None:
            return {"message": "property does not exist"}
        else:
            return property
    except UnauthorizedEditorError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unauthorized editor",
        )
