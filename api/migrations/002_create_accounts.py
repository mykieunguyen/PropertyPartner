steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL,
            first_name VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            phone_number VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
