# Data Models

## Accouts

 |Name| Type | Unique | Optional |
 |---| ---- | ------ | -------- |
 | id  | int  | yes    | no       |
 | username | string | yes | no |
 | password | string | no | no|
 | email | string | yes | no |
 | first_name | string | no | no |
 | last_name | string | no | no |
 | phone_number | string | no | no |


## Properties

 |Name| Type | Unique | Optional |
 |---| ---- | ------ | -------- |
 | id | int | yes | no |
 | price | int | no | no |
 | city | string | no | no |
 | bedrooms | int | no | no |
 | bathrooms | int | no | no |
 | address | string | no | no |
 | sq_footage | int | no | no |
 | year_built | int | no | no |
 | multistory | bool | no | no |
 | new_build | bool | no | no |
 | state | string | no | no |
 | user_id | reference to accounts entity | yes | no |

 ## Images
 |Name| Type | Unique | Optional |
 |---| ---- | ------ | -------- |
 | id | int | yes | no |
 | picture_url | string | no | no |
 | property_id | referene to properties entity | yes | no |
