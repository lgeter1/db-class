CREATE DATABASE book;
\c book


CREATE TABLE books
(isbn VARCHAR(20) NOT NULL,
	title VARCHAR(100),
	author VARCHAR(100),
	format VARCHAR(20),
	price DECIMAL,
	pages INTEGER,
	datepublished DATE,
	publisher VARCHAR(100),
	PRIMARY KEY(isbn)
);

CREATE TABLE author
(
	id INTEGER NOT NULL,
	name VARCHAR(35),
	residence VARCHAR(400),
	birthday DATE,
	PRIMARY KEY(id)
);

CREATE TABLE publisher
(id INTEGER NOT NULL,
	name VARCHAR(35),
	HQ VARCHAR(100),
	PRIMARY KEY (id)
);

INSERT INTO books (isbn, title, author, format, price, pages, datepublished, publisher) VALUES
('030788743X', 'Ready Player One', 'Ernest Cline', 'hardcover', 18.69, 384, '2011-08-16', 'Ballantine'),
('1524761338', 'Ready Player Two', 'Ernest Cline', 'hardcover', 13.18, 384, '2020-11-24', 'Ballantine' ),
('0062409166', 'The Rise and Fall of D.O.D.O.: A Novel', 'Neal Stephenson / Nicole Galland', 'hardcover', 4.28, 768, '2017-06-13', 'William Morrow' ),
('0062409158', 'The Rise and Fall of D.O.D.O.: A Novel', 'Neal Stephenson / Nicole Galland', 'paperback', 11.99, 768, '2017-06-13', 'William Morrow' ),
('0553380958', 'Snow Crash', 'Neal Stephenson', 'paperback', 9.99, 440, '2000-01-01', 'Del Ray' );

INSERT INTO author(id, name, residence, birthday) VALUES
(1, 'Ernest Cline', 'Austin TX', '1972-03-29' ),
(2,'Neal Stephenson', 'Seattle WA', '1959-10-31'),
(3, 'Nicole Galland', 'Martha''s Vineyard MA', '1965-10-31');

INSERT INTO publisher(id, name, HQ) VALUES
(1, 'Ballantine', 'New York, NY'),
(2, 'William Morrow', 'New York, NY'),
(3, 'Del Ray', 'New York, NY');
