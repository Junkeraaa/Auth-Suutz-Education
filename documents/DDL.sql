CREATE DATABASE Sivt;

USE Sivt;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('professor', 'aluno') NOT NULL
);
