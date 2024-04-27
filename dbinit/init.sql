CREATE DATABASE IF NOT EXISTS coursesdb;

USE coursesdb;

DROP TABLE IF EXISTS user_progression;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS courses;

CREATE TABLE courses
(
    id                       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name                     VARCHAR(255) NOT NULL,
    likes                    INTEGER DEFAULT 0,
    instructor               VARCHAR(255) NOT NULL,
    instructor_image_url     VARCHAR(255) NOT NULL,
    created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Course_Name UNIQUE (name)
) AUTO_INCREMENT = 1;

CREATE TABLE modules
(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    course_id   BIGINT UNSIGNED NOT NULL,
    duration    INT UNSIGNED NOT NULL,
    position    INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_progression (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    module_id BIGINT UNSIGNED NOT NULL,
    status ENUM('started', 'completed') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

-- Inserting two users into the `user` table
INSERT INTO user (first_name, last_name, email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com');

-- Inserting 5 records into the courses table
INSERT INTO courses (name, likes, instructor, instructor_image_url) VALUES
('Intro to Investing', 100, 'Alice Haraldsson', 'https://example.com/alice_h.jpg'),
('Propel Your Career', 150, 'Jane Smith', 'https://example.com/jane_smith.jpg'),
('Complete Guide to Saving', 200, 'Marta Johnson', 'https://example.com/marta_johnson.jpg'),
('Understanding Credit', 120, 'Emily Brown', 'https://example.com/emily_brown.jpg'),
('Family Financial Planning', 90, 'Rosalie Wilson', 'https://example.com/rosalie_wilson.jpg');

-- Adding modules for 'Intro to Investing'
INSERT INTO modules (name, course_id, duration, position) VALUES
('Module 1: Introduction to Investments', 1, 60, 1),
('Module 2: Stock Market Basics', 1, 90, 2),
('Module 3: Portfolio Management Strategies', 1, 120, 3);

-- Adding modules for 'Propel Your Career'
INSERT INTO modules (name, course_id, duration, position) VALUES
('Module 1: Resume Writing Essentials', 2, 60, 1),
('Module 2: Interview Preparation', 2, 90, 2),
('Module 3: Networking Strategies', 2, 120, 3);

-- Adding modules for 'Complete Guide to Saving'
INSERT INTO modules (name, course_id, duration, position) VALUES
('Module 1: Importance of Saving', 3, 60, 1),
('Module 2: Budgeting Techniques', 3, 90, 2),
('Module 3: Saving for Retirement', 3, 120, 3);

-- Adding modules for 'Understanding Credit'
INSERT INTO modules (name, course_id, duration, position) VALUES
('Module 1: Basics of Credit', 4, 60, 1),
('Module 2: Credit Scores and Reports', 4, 90, 2),
('Module 3: Managing Credit Wisely', 4, 120, 3);

-- Adding modules for 'Family Financial Planning'
INSERT INTO modules (name, course_id, duration, position) VALUES
('Module 1: Setting Financial Goals', 5, 60, 1),
('Module 2: Budgeting for Families', 5, 90, 2),
('Module 3: Estate Planning', 5, 120, 3);

DELIMITER //
CREATE PROCEDURE create_and_return(IN name VARCHAR(255), IN likes INTEGER, IN instructor VARCHAR(255), IN instructor_image_url VARCHAR(255))
BEGIN

    INSERT INTO courses(name, likes, instructor, instructor_image_url) VALUES (name, likes, instructor, instructor_image_url);

    SET @COURSE_ID = LAST_INSERT_ID();

    SELECT * FROM coursesdb WHERE id=@COURSE_ID;

END //
DELIMITER ;