DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS users;

--@block
DELETE FROM resumes;
DELETE FROM users;

--@block
DELETE FROM resumes WHERE id > 5;