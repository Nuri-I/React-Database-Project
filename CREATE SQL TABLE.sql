-- This is the SQL code uses to make the exact database used during the devlopment of this program
CREATE DATABASE IF NOT EXISTS my_website;
CREATE TABLE my_website.users  (
    id Int PRIMARY KEY,
    email Varchar(100) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    permission VARCHAR(10) NOT NULL
) COLLATE utf8mb4_0900_as_cs;

INSERT INTO my_website.users (id, email, username, pass, permission)
VALUES (1, "test@test.com", "ADMIN", "$2y$10$BbgVXNm3mn3eHkMFLQKyGe5JcLSV72iIOL7cIq1iYu1rUlZi2M2Jy", "admin");
INSERT INTO my_website.users (id, email, username, pass, permission)
VALUES (2, "iamanadmin@iamanadmin.com", "anotheradmin", "$2y$10$BbgVXNm3mn3eHkMFLQKyGe5JcLSV72iIOL7cIq1iYu1rUlZi2M2Jy", "admin");
INSERT INTO my_website.users (id, email, username, pass, permission)
VALUES (3, "first@lol.com", "IamFirst", "$2y$10$BbgVXNm3mn3eHkMFLQKyGe5JcLSV72iIOL7cIq1iYu1rUlZi2M2Jy", "member");
INSERT INTO my_website.users (id, email, username, pass, permission)
VALUES (4, "regular@user.com", "RegularUser", "$2y$10$BbgVXNm3mn3eHkMFLQKyGe5JcLSV72iIOL7cIq1iYu1rUlZi2M2Jy", "member");
-- the pass values are all a bcrypt hash for '1'

-- bellow lines were used during testing
SELECT * FROM my_website.users;
-- DROP TABLE my_website.users;
-- DROP DATABASE my_website;