DROP DATABASE IF EXISTS review_db_dev;

CREATE DATABASE review_db_dev;

USE review_db_dev;

CREATE TABLE characteristic (
    id SERIAL PRIMARY KEY,
    product_id integer,
    name text
);

CREATE TABLE characteristic_reviews (
    id SERIAL PRIMARY KEY,
    characteristic_id integer REFERENCES characteristic(id) ON UPDATE CASCADE REFERENCES characteristic(id) ON UPDATE CASCADE,
    review_id integer,
    value integer
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id integer,
    rating integer,
    date timestamp with time zone,
    summary text,
    body text,
    recommend boolean,
    reported boolean,
    reviewer_name text,
    reviewer_email text,
    response text,
    helpfulness integer
);

CREATE TABLE reviews_photos (
    id SERIAL PRIMARY KEY,
    review_id integer,
    url text
);

CREATE INDEX characteristic_idx ON characteristic(product_id int4_ops);
CREATE INDEX characteristic_reviews_idx ON characteristic_reviews(review_id int4_ops);
CREATE INDEX reviews_idx ON reviews(product_id int4_ops,id int4_ops);
CREATE INDEX reviews_photos_idx ON reviews_photos(review_id int4_ops);