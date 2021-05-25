DROP DATABASE IF EXISTS WebApi;
GO

CREATE DATABASE WebApi;
GO

USE WebApi;
GO

CREATE TABLE Users (
  userId        INT         NOT NULL IDENTITY  PRIMARY KEY,
  userName      VARCHAR(50) NOT NULL,
  userLastName  VARCHAR(50) NOT NULL,
  taskName      VARCHAR(50) NULL,
  fileName      VARCHAR(50) NULL
);
GO

INSERT INTO Users (userName, userLastName, taskName, fileName) VALUES 
  ('mark', 'twain', 'first', 'inmo.jpg'),
  ('tom', 'sawyer', 'second', 'inmo.jpg');
GO

CREATE TABLE Tasks (
  taskId            INT             NOT NULL IDENTITY  PRIMARY KEY,
  taskName          VARCHAR(50)     NOT NULL,
  taskDescription   VARCHAR(5000)   NOT NULL, 
  taskStartDate     VARCHAR(50)     NULL, 
  taskDueDate       VARCHAR(50)     NULL 
);
GO

INSERT INTO Tasks (taskName, taskDescription) VALUES
  ('first', 'this is the first task'),
  ('second', 'this is the second task');
GO
