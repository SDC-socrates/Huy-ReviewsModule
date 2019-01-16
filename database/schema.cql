drop keyspace if exists reviews;

create keyspace reviews with replication = {'class':'SimpleStrategy','replication_factor':1};

use reviews;

create table reviews (id varchar PRIMARY KEY, carid varchar, name varchar, review varchar, rating varchar, date varchar);

COPY reviews (id, carid, name, review, rating, date) FROM 'SEED2.csv' WITH HEADER = TRUE;
