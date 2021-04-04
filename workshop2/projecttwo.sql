\c postgres
DROP DATABASE IF EXISTS projecttwo;
CREATE DATABASE projecttwo;

\c projecttwo

CREATE TABLE userform(
username TEXT NOT NULL PRIMARY KEY,
firstname TEXT,
lastname TEXT,
email TEXT
);

CREATE TABLE workshop
(
attendeeid SERIAL PRIMARY KEY,	
title TEXT,
date DATE,
location TEXT,
maxseats INTEGER,
instructor TEXT
);

CREATE TABLE attendees (
username TEXT REFERENCES userform(username),
workshopid INTEGER NOT NULL REFERENCES workshop(attendeeid),
PRIMARY KEY (username, workshopid)
);

INSERT INTO userform (username, firstname, lastname, email) VALUES 
  ('bmulkern', 'Ben', 'Mulkern', ' bemulkern@gmail.com'),
        ('mphillips', 'Maggie', 'Phillips', 'Marget@uwm.edu'),
	        ('aphillips', 'Alvin', 'Phillips', 'alvinchip@gmail.com'),
		('cwieck', 'Clara', 'Wieck', 'JohnWieck@yahoo.com');


INSERT INTO workshop(title, date, location, maxseats, instructor) VALUES
('Tensorflow', '2018-05-06', 'Martha''s Vineyard', 40, 'Fiona Helbron'),
('DevOps', '2003-10-06', 'Bob''s Vineyard', 35, 'Wadi Rob');
	
