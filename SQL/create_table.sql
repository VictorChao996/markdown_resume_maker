
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
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
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
VALUES (1, 1, 'My Resume', 'This is my resume content', 1684121586601, 1684121586601, FALSE);

---@block
INSERT INTO resumes ( user_id, title, content, created_at,updated_at, visibility)
VALUES (1, 'My Resume 2', 'Second resume test', 1684121586601, 1684121586601, FALSE);
---@block
INSERT INTO resumes ( user_id, title, content, created_at,updated_at, visibility)
VALUES (3, 'My Resume 3', 'third resume test', 1684121586601, 1684121586601, FALSE);
---@block
INSERT INTO resumes ( user_id, title, content, created_at,updated_at, visibility)
VALUES (3, 'My Resume 4', 'forth resume test', 1684121586601, 1684121586601, FALSE);
---@block
INSERT INTO resumes ( id, user_id, title, content, created_at,updated_at, visibility)
VALUES (8,3, 'My Resume 4', 'forth resume test', 1684121586601, 1684121586601, FALSE);


