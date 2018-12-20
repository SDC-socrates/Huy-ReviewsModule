DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (
  id int NOT NULL ,
  name varchar(50) NOT NULL,
  review varchar(250),
  UNIQUE (id),
  PRIMARY KEY(ID)
);

-- mysql -u root < schema.sql


