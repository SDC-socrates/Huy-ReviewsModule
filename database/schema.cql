drop keyspace if exists reviews;

create keyspace reviews with replication = {'class':'SimpleStrategy','replication_factor':1};

use reviews;

create table reviews (id varchar, carid varchar, name varchar, review varchar, rating varchar, date varchar, PRIMARY KEY (carid, rating));

COPY reviews (id, carid, name, review, rating, date) FROM 'SEED.csv' WITH HEADER = TRUE;
