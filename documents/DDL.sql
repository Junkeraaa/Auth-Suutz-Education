select * from customer c;
select * from classroom cr ;
select * from classroom_member crm;
select * from teacher t;

create database sivt;
use sivt;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE teacher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE classroom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    classroom_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);

CREATE TABLE classroom_member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    classroom_id INT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (classroom_id) REFERENCES classroom(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

drop database sivt;


