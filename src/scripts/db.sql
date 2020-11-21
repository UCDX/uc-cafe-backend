create database uccafe_dihm;
use uccafe_dihm;

create table categories(
	id int unsigned primary key,
    name varchar(100)
);

create table products (
	id int unsigned primary key,
    name varchar(255) not null,
    image_url varchar(700) not null,
    price float(8, 4),
    description text not null,
    short_description varchar(140),
    category_id int unsigned not null,
    
    foreign key(category_id) references categories(id)
);

create table users (
	id int unsigned primary key,
    username varchar(20) not null,
    name varchar(50) not null,
    surnames varchar(100) not null,
    passwd varchar(255) not null
);

create table reviews (
	id int unsigned primary key,
    score tinyint unsigned,
    comment varchar(300),
    user_id int unsigned not null,
    product_id int unsigned not null,
    
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);

create table purchases (
	id int unsigned primary key,
    user_id int unsigned not null,
    
    foreign key(user_id) references users(id)
);

create table user_purchases (
	id int unsigned primary key,
	purchase_id int unsigned not null,
    product_id int unsigned not null,
    quantity int unsigned not null,
    
    foreign key(purchase_id) references purchases(id),
    foreign key(product_id) references products(id)
);

create table admins (
	id int unsigned primary key,
	username varchar(20) not null,
	email varchar(255) not null,
	fullname varchar(50) not null,
	passwd varchar(255) not null
);

create table authorized_apps (
	id int unsigned primary key,
	name varchar(255) not null,
	api_key varchar(700) not null unique,
	created_at datetime not null
);

