from psycopg_pool import ConnectionPool
import os
from models import AccountIn, AccountOut, AccountOutWithPassword

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])


class AccountsQueries():

    def get(self, username: str) -> AccountOutWithPassword:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    params = [
                        info.username,
                        hashed_password,
                        info.email,
                        info.first_name,
                        info.last_name,
                        info.phone_number,
                    ]
                    result = db.execute(
                        """
                        INSERT INTO accounts (
                            username,
                            password,
                            email,
                            first_name,
                            last_name,
                            phone_number
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        params,
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id, username=info.username,
                        password=hashed_password,
                        email=info.email,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        phone_number=info.phone_number,
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not create user"}
