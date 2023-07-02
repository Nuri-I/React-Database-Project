CREATE DATABASE IF NOT EXISTS website_users;
-- after running the first command select the "Website Users" database and run the rest. 
-- this code will set up a user with the username "ADMIN" and a password of 1
CREATE TABLE users(
	Id int PRIMARY KEY,
	Username varchar(255) NOT NULL,
	Pass varchar(255) NOT NULL
);
INSERT INTO users (Id, Username, Pass)
VALUES (1, "ADMIN", "1");