steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE properties (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            price INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            bedrooms SMALLINT NOT NULL,
            bathrooms SMALLINT NOT NULL,
            address VARCHAR(100) NOT NULL,
            sq_footage INTEGER NOT NULL,
            year_built SMALLINT NOT NULL,
            multistory BOOL NOT NULL,
            new_build BOOL NOT NULL,
            state VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE properties;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE images (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            picture_url VARCHAR(10000) NOT NULL,
            property_id INTEGER NOT NULL REFERENCES properties(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE images;
        """
    ]
]
