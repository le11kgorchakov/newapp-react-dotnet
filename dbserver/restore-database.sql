DROP DATABASE IF EXISTS WebApi;
GO

CREATE DATABASE WebApi;
GO

USE WebApi;
GO

CREATE TABLE users (
  userId        INT           NOT NULL  IDENTITY  PRIMARY KEY,
  userName     VARCHAR(50)   NOT NULL,
  userLastName      VARCHAR(50)   NOT NULL,
  fileName      VARCHAR(50)   NOT NULL,
  taskName       VARCHAR(50)   NOT NULL
);
GO

INSERT INTO users (firstName, lastName) VALUES 
  ('mark', 'twain'),
  ('tom', 'sawyer');
GO

CREATE TABLE tasks (
  taskId        INT           NOT NULL  IDENTITY  PRIMARY KEY,
  taskName         VARCHAR(50)  NOT NULL,
  taskDescription   VARCHAR(5000) NOT NULL, 
  taskStartDate   VARCHAR(50) NOT NULL, 
  taskDueDate   VARCHAR(50) NOT NULL
);
GO

INSERT INTO tasks (title, description) VALUES
  ('first', 'this is the first task'),
  ('second', 'this is the second task');
GO
