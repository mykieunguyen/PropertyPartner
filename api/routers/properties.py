from fastapi import (
    APIRouter,
    Depends,
)
from authenticator import authenticator
from typing import List, Union
from models import PropertiesOut, Error, PropertiesIn, AccountOut
from queries.properties import PropertiesQueries
router = APIRouter()


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
    return properties.create_property(property)
