
CREATE SCHEMA bms;


-- bms.book definition

-- Drop table

-- DROP TABLE bms.book;

CREATE TABLE bms.book (
	book_id serial4 NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(1000) NOT NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_id PRIMARY KEY (book_id)
);

-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

CREATE TABLE bms.app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json  NULL,
	audit_on timestamp NOT NULL,
	audit_by varchar(50) NOT NULL,
	audit_status varchar(50) NOT NULL,
	audit_error json  NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

CREATE TABLE bms.app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	active int2  NULL DEFAULT 1,
	created_on timestamp NOT NULL,
	created_by varchar(100) NOT NULL,
	updated_on timestamp NOT NULL,
	updated_by varchar(100) NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_email UNIQUE (email),
	CONSTRAINT user_username_key UNIQUE (username)
);
CREATE TABLE bms.app_group (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_pkey PRIMARY KEY (group_id),
	CONSTRAINT group_name_key UNIQUE (group_name)
);

CREATE TABLE bms.app_role (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_name_key UNIQUE (role_name)
);

CREATE TABLE bms.user_group (
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE bms.group_role(
	group_role_id serial NOT NULL,
	role_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE bms.user_type(
	user_type_id serial NOT NULL,
	user_type_name varchar(500) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);  