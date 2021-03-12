\c postgres
DROP DATABASE IF EXISTS projectone;
CREATE DATABASE projectone;

\c projectone

CREATE TABLE workshop (
id Serial Primary Key,
attendees TEXT NOT NULL,
workshops TEXT
);

INSERT INTO workshop (attendees, workshops) VALUES 
('Ahmned Abdelali', 'DevOps 101'),
('Ann Frank', 'Docker Container Fundamentals'),
('Ann Mulkern', 'Machine Learning' ),
('Clara Weick', 'Modern Javascript'),
('James Archer', 'MongoDB'),
('Linda Park', 'React Fundamentals'),
('Lucy Smith', 'Self-Driving Cars'),
('Roz Billingsley', 'DevOps 101'),
('Samatha Eggert', 'React Fundamentals'),
('Tim Smith', 'MongoDB');
