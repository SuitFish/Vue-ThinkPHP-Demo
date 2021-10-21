# 创建数据库
CREATE DATABASE if not exists studentsdb;
use studentsdb;
create table if not exists t_students
(
	id int auto_increment,
	name varchar(8) not null,
	sex varchar(2) default '男' not null,
	age int not null,
	hobbyName varchar(255) null,
	summary text null,
	constraint t_students_id_uindex
		unique (id)
);

alter table t_students
	add primary key (id);

