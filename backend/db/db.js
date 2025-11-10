const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  multipleStatements: true,
});

const initSQL = `
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  fName VARCHAR(255) NOT NULL,
  lName VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age TINYINT UNSIGNED NOT NULL,
  height SMALLINT UNSIGNED NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  diseases VARCHAR(255),
  
  sex ENUM('male', 'female', 'other') NOT NULL,
  BMI DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS trainers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  expertise VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

`;


db.connect((err) => {
    if (err) throw err;
    db.query(initSQL, (err) => {
      if (err) throw err;
      console.log(" Database and tables initialized");
    });
  });
module.exports = db;