-- createdb reviews
-- psql -U <YOUR USER NAME> -d reviews -a -f database/schema.sql

\c reviews;

CREATE TABLE reviews (
  id SERIAL,
  carid varchar,
  name varchar(50) NOT NULL,
  review varchar(500),
  rating varchar,
  date varchar(20),
  PRIMARY KEY(ID)
);


COPY reviews(carid, name, review, rating, date)
FROM '/Users/ccades/Desktop/HRR/Huy-ReviewsModule/SEED.csv' DELIMITER ',' CSV HEADER;
