create database if not exists uccafe_dihm;
use uccafe_dihm;

create table if not exists categories(
	id int unsigned primary key auto_increment,
    name varchar(100)
);

create table if not exists products (
	id int unsigned primary key auto_increment,
    name varchar(255) not null,
    image_url varchar(700) not null,
    price float(8, 4),
    description text not null,
    short_description varchar(140),
    category_id int unsigned not null,
    
    foreign key(category_id) references categories(id)
);

create table if not exists users (
	id int unsigned primary key auto_increment,
    username varchar(20) not null,
    name varchar(50) not null,
    surnames varchar(100) not null,
    passwd varchar(255) not null
);

create table if not exists reviews (
	id int unsigned primary key auto_increment,
    score float(4, 2) unsigned,
    comment varchar(300),
    user_id int unsigned not null,
    product_id int unsigned not null,
    
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);

create table if not exists purchases (
	id int unsigned primary key auto_increment,
    user_id int unsigned not null,
    created_at datetime default now(),
    
    foreign key(user_id) references users(id)
);

create table if not exists user_purchases (
	id int unsigned primary key auto_increment,
	purchase_id int unsigned not null,
    product_id int unsigned not null,
    quantity int unsigned not null,
    
    foreign key(purchase_id) references purchases(id),
    foreign key(product_id) references products(id)
);

create table if not exists admins (
	id int unsigned primary key auto_increment,
	username varchar(20) not null,
	email varchar(255) not null,
	fullname varchar(50) not null,
	passwd varchar(255) not null
);

create table if not exists authorized_apps (
	id int unsigned primary key auto_increment,
	name varchar(255) not null,
	api_key varchar(700) not null unique,
	created_at datetime not null default now()
);

