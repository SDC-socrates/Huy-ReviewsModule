create keyspace reviews with replication = {'class':'SimpleStrategy','replication_factor':1};

use reviews;

create table reviews (id uuid primary key, carid int, name varchar, review varchar, rating int, date varchar);
