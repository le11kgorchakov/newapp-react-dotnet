CREATE DATABASE WebApi;
GO

USE WebApi;
GO

CREATE TABLE Users (
  userId        INT             IDENTITY  PRIMARY KEY,
  userName     VARCHAR(50),
  userLastName      VARCHAR(50),
  taskName       VARCHAR(50),
  fileName      VARCHAR(50)
);
GO

INSERT INTO Users (userName, userLastName, taskName, fileName) VALUES 
  ('mark', 'twain', 'first', 'inmo.jpg'),
  ('tom', 'sawyer', 'second', 'inmo.jpg');
GO

CREATE TABLE Tasks (
  taskId        INT             IDENTITY  PRIMARY KEY,
  taskName         VARCHAR(50),
  taskDescription   VARCHAR(5000), 
  taskStartDate   VARCHAR(50), 
  taskDueDate   VARCHAR(50) 
);
GO

INSERT INTO Tasks (taskName, taskDescription) VALUES
  ('first', 'this is the first task'),
  ('second', 'this is the second task');
GO
