CREATE DATABASE courses;
\c courses

CREATE TABLE course
(course VARCHAR(7) NOT NULL,
	title VARCHAR(35),
	description VARCHAR(400),
	PRIMARY KEY(course)
);

CREATE TABLE instructor
(id INTEGER NOT NULL,
	name VARCHAR(100),
	email VARCHAR(100),
	PRIMARY KEY(id)
);

CREATE TABLE class
(
	id INTEGER NOT NULL,
	courseid VARCHAR(7) NOT NULL,
	instructorid INTEGER NOT NULL,
	section INTEGER,
	day VARCHAR(3),
	time VARCHAR(10),
	building VARCHAR(20),
	room VARCHAR(3),
	PRIMARY KEY(id),
	FOREIGN KEY (courseid) REFERENCES course(course),
	FOREIGN KEY (instructorid) REFERENCES instrcutor(id)
);

INSERT INTO course (course, title, description) VALUES
('CS120', 'Javascript Fundamentals', 'This course is designed to provide a solid introduction to the JavaScript language. We will explore the more unique and tricky JavaScript features such as closures, higher-order functions'),
('CS220', 'PostgreSQL', 'This course will teach you how to explore, modify, and export data from a database. You’ll be introduced to foundational concepts like tables, data types, and queries.' ),
('CS340', 'DevOps', 'We examine the definition and concepts around the ideas of DevOps. How do they relate to working in the cloud?');

INSERT INTO instructor (id, name, email) VALUES
(1,'Becca Elenzil','elenzil@ada.org'),
(2, 'Claire Elliot' , 'elliot@ada.org'),
(3, 'Kaida Masaki' , 'kmas@ada.org');

INSERT INTO class (id, courseid, instructorid, section, day, time, building, room) VALUES
(1 ,'CS120', 1, 1, 'MW', 'morning', 'downtown', 'c12'),
(2 ,'CS120' 2 , 2, 'MW', 'afternoon', 'downtown', 'c8'),
(3 , 'CS220' ,1, 1, 'MW', 'morning', 'downtown', 'c12'),
(4 ,'CS340', 3, 1 ,'TT', 'afternoon', 'Nob Hill', 'nh1'),
(5 ,'CS340', 3 , 2 , 'MW', 'afternoon', 'downtown', 'c10');
