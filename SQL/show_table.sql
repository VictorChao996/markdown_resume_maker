--@block
SHOW TABLES;

--@block
SELECT * FROM users;

--@block
SELECT * FROM resumes;

--@block
SELECT id FROM resumes WHERE user_id = 3;

--@block
SELECT title,id FROM resumes WHERE user_id = 3;