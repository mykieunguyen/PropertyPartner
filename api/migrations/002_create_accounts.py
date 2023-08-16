steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            username VARCHAR(1000) NOT NULL UNIQUE,
            password VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
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
