CREATE DATABASE login_cadastro_db;

USE login_cadastro_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('professor', 'aluno') NOT NULL
);

create table class_manager (
id int primary key auto_increment,
teacher_id int not null,
class_name varchar(100) not null
);

create table class_members (
id int primary key auto_increment,
class_id int not null,
user_id int not null
);


