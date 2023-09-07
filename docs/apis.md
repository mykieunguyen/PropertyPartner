# APIs

## Property

- Method: POST, GET, DELETE, PUT
- Path: /api/properties, /api/properties/{property_id}, /api/properties/mine

Input:

```
{
  "price": int,
  "city": "string",
  "bedrooms": int,
  "bathrooms": int,
  "address": "string",
  "sq_footage": int,
  "year_built": int,
  "multistory": true,
  "new_build": true,
  "state": "string"
}
```

Output:

```
{
  "price": int,
  "city": "string",
  "bedrooms": int,
  "bathrooms": int,
  "address": "string",
  "sq_footage": int,
  "year_built": int,
  "multistory": true,
  "new_build": true,
  "state": "string"
}
```

Creating a new property saves the price, city, number of bedrooms, number of bathrooms, address, square footage, the year built, the state, and if the property is multistory or if it is newly built. This adds a new property to the database.

## Accounts

- Method: GET, POST, DELETE
- Path: /api/accounts, /token

Input:
```
{
  "username": "string",
  "password": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "phone_number": "string"
}
```

Output:
```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": "string",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
  }
}
```

The Accounts API will create, login, and logout a user from the Property Partner website. Users will need to fill in all the required fields to create an account. The token_type will indicate whether the user has a valid session and is properly logged in.

## Images

- Method: GET, POST, DELETE
- Path: /api/{property_id}/image, /api/{property_id}/image/{image_id}

Input:
```
{
  "picture_url": "string"
}
```

Output:
```
{
  "id": int,
  "picture_url": "string",
  "property_id": int
}
```

The Images API will get, create, and delete images that are linked to a specific property. The user will need to input a valid picture URL that will then be given a image id along with the property id that the image is connected to.
