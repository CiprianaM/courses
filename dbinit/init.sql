CREATE DATABASE IF NOT EXISTS coursesdb;

USE coursesdb;

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
    CONSTRAINT UQ_Course_Name UNIQUE (course_name)
) AUTO_INCREMENT = 1;

DELIMITER //
CREATE PROCEDURE create_and_return(IN name VARCHAR(255), IN likes INTEGER, IN instructor VARCHAR(255), IN instructor_image_url VARCHAR(255))
BEGIN

    INSERT INTO courses(name, likes, instructor, instructor_image_url) VALUES (name, likes, instructor, instructor_image_url);

    SET @COURSE_ID = LAST_INSERT_ID();

    SELECT * FROM coursesdb WHERE id=@COURSE_ID;

END //
DELIMITER ;