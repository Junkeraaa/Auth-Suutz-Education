CREATE DATABASE suitzdb;

USE login_cadastro_db;

CREATE TABLE student (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
);

CREATE 

create table classroom_student (
    id              INT AUTO_INCREMENT PRIMARY KEY 
    studentId       INT
    clasroomId      INT
    FOREIGN KEY (studentId) REFERENCES student(id);
    FOREIGN KEY (classroomId) REFERENCES classroom(id);
);

create table classroom (
id int primary key auto_increment,
class_id int not null,
user_id int not null
);


