
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
); 

CREATE TABLE resumes(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(32) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    visibility BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);



-- *insert user value to table
--@block
INSERT INTO users (id, name, email, password_hash)
VALUES (1, 'johnDoe', 'john@example.com', 'hashedPassword123');
--@block
INSERT INTO users (id, name, email, password_hash)
VALUES (2, 'vicvic', '123@gmail.com', 'vicvic');

-- *insert resume value to table
--@block
INSERT INTO resumes (id, user_id, title, content, created_at, updated_at, visibility)
VALUES (1, 1, 'My Resume', 'This is my resume content', NOW(), NOW(), FALSE);

---@block
INSERT INTO resumes ( user_id, title, content, created_at,updated_at, visibility)
VALUES (1, 'My Resume 2', 'Second resume test', NOW(), NOW(), FALSE);



