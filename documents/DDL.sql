CREATE DATABASE login_cadastro_db;

USE login_cadastro_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('professor', 'aluno') NOT NULL
);
