CREATE DATABASE coding
\c coding;

CREATE TABLE section
(course VARCHAR(35) ,
section INTEGER NOT NULL,
day VARCHAR(50),
locationid INTEGER,
PRIMARY KEY(section)
);
CREATE TABLE courses
(course VARCHAR(35),
title VARCHAR(50),
description VARCHAR(100),
PRIMARY KEY(course),
FOREIGN KEY (course) REFERENCES section(course)
);
CREATE TABLE instructor
(title VARCHAR(50),
instructor VARCHAR(35),
instructor_email VARCHAR(35),
morning/afternoon VARCHAR(35),
PRIMARY KEY(instuctor),
FOREIGN KEY(title) REFERENCES courses(title)
);
CREATE TABLE building
(id INTEGER NOT NULL,
building VARCHAR(35),
room VARCHAR(35),
PRIMARY KEY(id),
FOREIGN KEY(id) REFERENCES section(locationid)
);

INSERT INTO section (course, section, day, locationid) VALUES
('CS120', 1, 'MW', 1),
('CS120', 2, 'MW', 2),
('CS220',1, 'MW', 3),
('CS340',1, 'TT', 4),
('CS340',2, 'MW', 5 );
INSERT INTO courses (course, title, description) VALUES
('CS120','Javascript Fundamentals', 'This course is designed to provide a solid introduction to the JavaScript language. We will explore the more unique and tricky JavaScript features such as closures, higher-order functions'),
('CS220','PostgreSQL','This course will teach you how to explore, modify, and export data from a database. You’ll be introduced to foundational concepts like tables, data types, and queries.'),
('CS340', 'DevOps', 'We examine the definition and concepts around the ideas of DevOps. How do they relate to working in the cloud?');
INSERT INTO instructor (title, instructor, instructor_email, morning/afternoon) VALUES
(1,'Javascript Fundamentals', 'Becca Elenzil', 'elenzil@ada.org', 'morning'),
(2,'Javascript Fundamentals', 'Claire Elliot', 'elliot@ada.org', 'afternoon'),
(3,'PostgreSQL', 'Becca Elenzil', 'elenzil@ada.org', 'afternoon'),
(4,'DevOps', 'Kaida Masaki', 'kmas@ada.org', 'afternoon');
INSERT INTO building (id, building, room) VALUES
(1, 'downtown', 'c12'),
(2, 'downtown', 'c8'),
(3, 'downtown', 'c12'),
(4, 'Nob Hill', 'nh1'),
(5, 'downtown', 'c10');
