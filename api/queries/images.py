from psycopg_pool import ConnectionPool
import os
from typing import List, Union
from models import ImageIn, ImageOut, Error, UnauthorizedEditorError


pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])


class ImagesQueries:
    def get_property(self, property_id: int,):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    properties = db.execute(
                        """
                        SELECT *
                        FROM properties
                        WHERE id = %s
                        """,
                        [property_id]
                    )
                    user_id = properties.fetchone()[11]
                    return user_id
        except Exception as e:
            print(e)
            return {"message": "Property does not exist"}

    def create(self, image: ImageIn,
               property_id: int,
               user_id: int) -> Union[ImageOut, Error]:
        property_creator = self.get_property(property_id)
        if user_id == property_creator:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        images = db.execute(
                            """
                            INSERT INTO images
                            (picture_url, property_id)
                            VALUES
                            (%s, %s)
                            RETURNING id;
                            """,
                            [image.picture_url, property_id]
                        )
                        id = images.fetchone()[0]
                        return ImageOut(
                            id=id,
                            picture_url=image.picture_url,
                            property_id=property_id,
                        )
            except Exception as e:
                print(e)
                return {"message": "Could not create image"}
        else:
            raise UnauthorizedEditorError

    def delete(self, image_id: int,
               property_id: int,
               user_id: int) -> Union[bool, Error]:
        property_creator = self.get_property(property_id)
        if user_id == property_creator:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM images
                            WHERE id = %s
                            """,
                            [image_id]
                        )
                        return True
            except Exception as e:
                print(e)
                return {"message": "Could not delete image"}
        else:
            raise UnauthorizedEditorError

    def get(self, property_id: int) -> Union[List[ImageOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    images = db.execute(
                        """
                        SELECT * FROM images
                        WHERE property_id = %s
                        """,
                        [property_id]
                    )
                    return [ImageOut(
                        id=image[0],
                        picture_url=image[1],
                        property_id=property_id)
                        for image in images
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get images"}
