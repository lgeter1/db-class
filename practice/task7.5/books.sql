CREATE DATABASE books;
\c books;


CREATE TABLE book
(isbn INTEGER NOT NULL,
title VARCHAR(50),
format VARCHAR(35),
pages INTEGER NOT NULL
price FLOAT,
PRIMARY KEY (isbn)
);
CREATE TABLE authors
(authorid INTEGER NOT NULL,
title VARCHAR(50),
author VARCHAR(35),
author_residence VARCHAR(50),
author_birthday VARCHAR(50),
PRIMARY KEY (authorid),
FOREIGN KEY (title) REFERENCES book(title)
);
CREATE TABLE publishers
(publisherid INTEGER NOT NULL,
author VARCHAR(35),
publisher VARCHAR(50),
publication_date VARCHAR(35),
publisher_HQ VARCHAR(50),
PRIMARY KEY (publisherid),
FOREIGN KEY (author) references authors(author)
);

INSERT INTO book (isbn, title, format, pages, price) VALUES
(030788743X, 'Ready Player One', 'hardcover', 384, 18.69),
(1524761338, 'Ready Player Two', 'hardcover', 384, 13.18),
(0062409166, 'The Rise and Fall of D.O.D.O.: A Novel', 'hardcover', 768, 4.28),
(0062409158, 'The Rise and Fall of D.O.D.O.: A Novel', 'paperback', 768, 11.99 ),
(0553380958, 'Snow Crash', 'paperback', 440, 9.99);
INSERT INTO authors(authorid, title, author, author_residence, author_birthday) VALUES
(1, 'Ready Player One', 'Ernest Cline', 'Austin TX', 'March 29, 1972'),
(2,'Ready Player Two', 'Ernest Cline', 'Austin TX', 'March 29, 1972' ),
(3, 'The Rise and Fall of D.O.D.O.: A Novel', 'Neal Stephenson', 'Seattle WA', 'October 31, 1959' ),
(4, 'The Rise and Fall of D.O.D.O.: A Novel', 'Nicole Galland', 'Martha''s Vineyard, Ma', 'October 31, 1965'),
(5, 'Snow Crash' , 'Neal Stephenson', 'Seattle WA', 'October 31, 1959');
INSERT INTO publishers(publisherid, author, publisher, publication_date, publisher_HQ) VALUES 
('Ernest Cline', 'Ballantine', 'August 16, 2011', 'New York, NY' ),
('Ernest Cline', 'Ballantine', 'November 24, 2020', 'New York, NY'),
('Neal Stephenson', 'William Morrow', 'June 13, 2017', 'New York, NY'),
('Nicole Galland', 'William Morrow', 'June 13, 2017', 'New York, NY'),
('Neal Stephenson', 'Del Ray', 'January 1, 2000', 'New York, NY');
