from psycopg_pool import ConnectionPool
import os
from typing import List, Union, Optional
from models import (PropertiesOut,
                    Error,
                    PropertiesIn,
                    UnauthorizedEditorError,
                    PropertyWithOwner,
                    PropertyOwner)


pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])


class PropertiesQueries:
    def get_properties(self) -> Union[List[PropertiesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        SELECT *
                        FROM properties
                        """,
                    )
                    return [self.record_to_property_out(property)
                            for property in properties
                            ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all properties"}

    def create_property(self,
                        property: PropertiesIn,
                        account_data) -> Union[PropertiesOut, Error]:
        user_id = account_data["id"]
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        INSERT INTO properties
                        (price, city, bedrooms, bathrooms, address,
                        sq_footage, year_built, multistory,
                        new_build, state, user_id)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [property.price, property.city, property.bedrooms,
                         property.bathrooms, property.address,
                         property.sq_footage, property.year_built,
                         property.multistory, property.new_build,
                         property.state, user_id]
                    )
                    property_id = properties.fetchone()[0]
                    return self.property_in_to_property_out(property_id,
                                                            property,
                                                            user_id)
        except Exception as e:
            print(e)
            return {"message": "Could not create property"}

    def get_property(self, property_id: int,) -> Optional[PropertyWithOwner]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        SELECT p.*, a.id, a.email,
                        a.first_name, a.last_name, a.phone_number
                        FROM properties p
                        JOIN accounts a
                        ON p.user_id = a.id
                        WHERE p.id = %s
                        """,
                        [property_id]
                    )
                    property = properties.fetchone()
                    if property is None:
                        return None
                    return self.record_to_property_out_with_account(property)
        except Exception as e:
            print(e)
            return {"message": "could not get property"}

    def update_property(self,
                        property_id: int,
                        property: PropertiesIn,
                        user_id: int) -> Union[PropertiesOut, Error]:
        property_creator = self.get_property(property_id).dict()
        creator_id = property_creator['owner']['id']
        if user_id == creator_id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE properties
                            SET price = %s, city = %s, bedrooms = %s,
                            bathrooms = %s,address = %s, sq_footage = %s,
                            year_built = %s,multistory = %s,
                            new_build = %s, state = %s
                            WHERE id = %s
                            RETURNING user_id
                            """,
                            [property.price, property.city, property.bedrooms,
                             property.bathrooms, property.address,
                             property.sq_footage, property.year_built,
                             property.multistory, property.new_build,
                             property.state, property_id]
                        )
                        return self.property_in_to_property_out(property_id,
                                                                property,
                                                                user_id)
            except Exception as e:
                print(e)
                return {"message": "Could not edit property"}
        else:
            raise UnauthorizedEditorError

    def delete(self, property_id: int, user_id: int) -> Union[bool, Error]:
        property_creator = self.get_property(property_id)
        if property_creator is None:
            return None
        else:
            property_creator = property_creator.dict()
            creator_id = property_creator['owner']['id']
            if user_id == creator_id:
                try:
                    with pool.connection() as conn:
                        with conn.cursor() as db:
                            db.execute(
                                """
                                DELETE FROM properties
                                WHERE id = %s
                                """,
                                [property_id]
                            )
                            return True
                except Exception as e:
                    print(e)
                    return {"message": "Cannot delete property"}
            else:
                raise UnauthorizedEditorError

    def get_my_properties(self,
                          user_id: int) -> Union[List[PropertiesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        SELECT *
                        FROM properties
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    return [self.record_to_property_out(property)
                            for property in properties]
        except Exception as e:
            print(e)
            return {"message": "Cannot retrieve user properties"}

    def property_in_to_property_out(self,
                                    property_id: int,
                                    property: PropertiesIn,
                                    user_id: int):
        old_data = property.dict()
        return PropertiesOut(
            id=property_id,
            user_id=user_id,
            **old_data,
        )

    def record_to_property_out(self, property):
        return PropertiesOut(
            id=property[0],
            price=property[1],
            city=property[2],
            bedrooms=property[3],
            bathrooms=property[4],
            address=property[5],
            sq_footage=property[6],
            year_built=property[7],
            multistory=property[8],
            new_build=property[9],
            state=property[10],
            user_id=property[11],
        )

    def record_to_property_out_with_account(self, property):
        return PropertyWithOwner(
            id=property[0],
            price=property[1],
            city=property[2],
            bedrooms=property[3],
            bathrooms=property[4],
            address=property[5],
            sq_footage=property[6],
            year_built=property[7],
            multistory=property[8],
            new_build=property[9],
            state=property[10],
            user_id=property[11],
            owner=PropertyOwner(
                id=property[12],
                email=property[13],
                first_name=property[14],
                last_name=property[15],
                phone_number=property[16]
            )
        )
