drop keyspace if exists reviews;

create keyspace reviews with replication = {'class':'SimpleStrategy','replication_factor':1};

use reviews;

create table reviews (id bigint PRIMARY KEY, carid bigint, name varchar, review varchar, rating int, date varchar);

COPY reviews (id, carid, name, review, rating, date) FROM 'SEED_CAS.csv' WITH HEADER = TRUE;
