-- Active: 1697185614964@@147.139.210.135@5432@alif01


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('main course');
INSERT INTO category(name) VALUES('desert');
INSERT INTO category(name) VALUES('appetizer');

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    image VARCHAR,
    category_id INT NOT NULL
);

ALTER TABLE recipe ADD FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE recipe ADD COLUMN users_id INT;
ALTER TABLE recipe ADD FOREIGN KEY (users_id) REFERENCES users(id);

ALTER TABLE recipe ADD COLUMN create_at TIMESTAMP DEFAULT NOW();

SELECT * FROM users;

SELECT * FROM recipe;

ALTER TABLE recipe ALTER COLUMN users_id SET NOT NULL;

ALTER TABLE recipe DROP COLUMN public_id ;

TRUNCATE TABLE recipe RESTART IDENTITY;

CREATE TABLE comment (
    comment_id serial PRIMARY KEY,
    recipe_id integer NOT NULL,
    user_id integer NOT NULL,
    comment_text text NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE comment
DROP CONSTRAINT IF EXISTS comment_recipe_id_fkey;

ALTER TABLE comment
ADD CONSTRAINT comment_recipe_id_fkey
FOREIGN KEY (recipe_id)
REFERENCES recipe (id)
ON DELETE CASCADE;