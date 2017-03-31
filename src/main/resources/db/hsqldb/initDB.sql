DROP TABLE weather IF EXISTS;


CREATE TABLE weather (
  id         INTEGER IDENTITY PRIMARY KEY,
  temp VARCHAR(30),
  city  VARCHAR(30)
);

