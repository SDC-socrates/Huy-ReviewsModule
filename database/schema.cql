drop keyspace if exists reviews;

create keyspace reviews with replication = {'class':'SimpleStrategy','replication_factor':1};

use reviews;

create table reviews (id bigint, carid bigint, name varchar, review varchar, rating int, date varchar, PRIMARY KEY ((carid), rating, id));
