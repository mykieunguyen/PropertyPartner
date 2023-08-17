from psycopg_pool import ConnectionPool
import os
from typing import List, Union
from models import PropertiesOut, Error, PropertiesIn


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

    def create_property(self, property: PropertiesIn) -> Union[PropertiesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        INSERT INTO properties
                        (price, city, bedrooms, bathrooms, address, sq_footage, year_built, multistory, new_build, state)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [property.price, property.city, property.bedrooms, property.bathrooms, property.address,
                            property.sq_footage, property.year_built, property.multistory, property.new_build, property.state]
                    )
                    id = properties.fetchone()[0]
                    return self.property_in_to_property_out(id, property)
        except Exception as e:
            print(e)
            return {"message": "Could not create property"}

    def property_in_to_property_out(self, id: int, property: PropertiesIn):
        old_data = property.dict()
        return PropertiesOut(
            id=id,
            **old_data
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
            state=property[10]
        )
