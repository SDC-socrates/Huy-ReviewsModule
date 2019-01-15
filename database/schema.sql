-- createdb reviews
-- psql -U <YOUR USER NAME> -d reviews -a -f database/schema.sql

\c reviews;

CREATE TABLE reviews (
  id SERIAL,
  carId int,
  name varchar(100) NOT NULL,
  review varchar(500),
  rating int,
  date varchar(100),
  PRIMARY KEY(ID)
);
