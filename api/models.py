from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class DuplicateUsernameError(ValueError):
    pass


class DuplicateEmailError(ValueError):
    pass


class DuplicateError(ValueError):
    pass


class UnauthorizedEditorError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    phone_number: str


class AccountOut(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str
    phone_number: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


class Error(BaseModel):
    message: str


class PropertiesIn(BaseModel):
    price: int
    city: str
    bedrooms: int
    bathrooms: int
    address: str
    sq_footage: int
    year_built: int
    multistory: bool
    new_build: bool
    state: str


class PropertiesOut(BaseModel):
    id: int
    price: int
    city: str
    bedrooms: int
    bathrooms: int
    address: str
    sq_footage: int
    year_built: int
    multistory: bool
    new_build: bool
    state: str
    user_id: int


class ImageIn(BaseModel):
    picture_url: str


class ImageOut(BaseModel):
    id: int
    picture_url: str
    property_id: int


class PropertyOwner(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    phone_number: str

class PropertyWithOwner(BaseModel):
    id: int
    price: int
    city: str
    bedrooms: int
    bathrooms: int
    address: str
    sq_footage: int
    year_built: int
    multistory: bool
    new_build: bool
    state: str
    owner: PropertyOwner
