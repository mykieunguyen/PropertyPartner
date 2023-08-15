from psycopg_pool import ConnectionPool
import os
from models import AccountIn, AccountOut, AccountOutWithPassword

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])


class AccountsQueries():

    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username]
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return AccountOutWithPassword(
                    id=record["id"],
                    username=record["username"],
                    hashed_password=record["password"],
                    email=record["email"],
                    first_name=record["first_name"],
                    last_name=record["last_name"],
                    phone_number=record["phone_number"]
                )

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
                        hashed_password=hashed_password,
                        id=id,
                        username=info.username,
                        email=info.email,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        phone_number=info.phone_number,
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not create user"}
