-- Active: 1688122491292@@127.0.0.1@5432@recipes@public
CREATE DATABASE Recipes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    password VARCHAR NOT NULL
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    image TEXT
);

SELECT * FROM users;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('appetizer');

SELECT * FROM recipe;

ALTER TABLE recipe ADD category_id INT,ADD FOREIGN KEY (category_id) REFERENCES category(id)





