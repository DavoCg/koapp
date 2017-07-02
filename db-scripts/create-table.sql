CREATE TABLE customer (
    id INT PRIMARY KEY NOT NULL,
    phone VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255),
    stripe_id VARCHAR(255) NOT NULL,
    instagram_id VARCHAR(255) UNIQUE
);

CREATE TABLE post (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    picture VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    instagram_post_id VARCHAR(255),
    quantity INT,
    description VARCHAR(255)
);

CREATE TABLE cart_post (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    post_id INT NOT NULL REFERENCES post(id),
    quantity INT
);

CREATE TABLE order_post (
    id INT PRIMARY KEY NOT NULL,
    reference VARCHAR(255) NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    post_id INT NOT NULL REFERENCES post(id),
    quantity INT
);

CREATE TABLE favorite (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    post_id INT NOT NULL REFERENCES post(id)
);

CREATE TABLE address (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    city VARCHAR(255),
    zip VARCHAR(255),
    number VARCHAR(255),
    street VARCHAR(255),
    phone VARCHAR(255),
    additional VARCHAR(255),
);

CREATE TABLE payment (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES customer(id),
    stripe_id VARCHAR(255),
    last_4 INT,
    brand VARCHAR(255)
);