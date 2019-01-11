-- createdb reviews
-- psql -U <YOUR USER NAME> -d reviews -a -f database/schema.sql

\c reviews;

CREATE TABLE reviews (
  id SERIAL,
  carId int,
  name varchar(50) NOT NULL,
  review varchar(250),
  rating int,
  date varchar(20),
  PRIMARY KEY(ID)
);
