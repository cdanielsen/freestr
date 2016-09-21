CREATE DATABASE freestr;

\c freestr;

CREATE TABLE piles (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  location VARCHAR,
  number_of_items INT
);

INSERT INTO piles (
  name,
  location,
  number_of_items
) VALUES (
  'SeedPileBruh!',
  'Your mom"s house',
  2
);
