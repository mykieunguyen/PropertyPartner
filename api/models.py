from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class DuplicateAccountError(ValueError):
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
