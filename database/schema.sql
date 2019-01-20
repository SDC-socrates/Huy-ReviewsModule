-- createdb reviews
-- psql -U <YOUR USER NAME> -d reviews -a -f database/schema.sql

\c reviews;

CREATE TABLE reviews (
  id SERIAL,
  carid integer,
  name varchar(50) NOT NULL,
  review varchar(500),
  rating integer,
  date varchar(20),
  PRIMARY KEY(ID)
);


COPY reviews(carid, name, review, rating, date)
FROM '/Users/ccades/Desktop/HRR/Huy-ReviewsModule/SEED_PSG.csv' DELIMITER ',' CSV HEADER;
