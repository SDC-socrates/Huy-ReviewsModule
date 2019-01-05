DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  name varchar(50) NOT NULL,
  review varchar(250),
  rating int,
  date varchar(20),
  PRIMARY KEY(ID)
);


-- mysql -u root < database/schema.sql
