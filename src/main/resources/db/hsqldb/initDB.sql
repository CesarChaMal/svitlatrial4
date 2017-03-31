DROP TABLE vets IF EXISTS;
DROP TABLE owners IF EXISTS;
DROP TABLE weather IF EXISTS;


CREATE TABLE weather (
  id         INTEGER IDENTITY PRIMARY KEY,
  temperture VARCHAR(30),
  city  VARCHAR(30)
);

CREATE TABLE vets (
  id         INTEGER IDENTITY PRIMARY KEY,
  first_name VARCHAR(30),
  last_name  VARCHAR(30)
);

CREATE TABLE owners (
  id         INTEGER IDENTITY PRIMARY KEY,
  first_name VARCHAR(30),
  last_name  VARCHAR_IGNORECASE(30),
  address    VARCHAR(255),
  city       VARCHAR(80),
  telephone  VARCHAR(20)
);
