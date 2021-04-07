\c postgres
DROP DATABASE IF EXISTS loggers;
CREATE DATABASE loggers;
\c loggers

CREATE TABLE users (
username TEXT NOT NULL PRIMARY KEY,
password TEXT, 
screenname TEXT
);

