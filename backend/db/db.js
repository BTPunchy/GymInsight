const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  multipleStatements: true,
});

const initSQL = `
-- สร้างฐานข้อมูลถ้ายังไม่มี
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

-- ตารางผู้ใช้
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

-- ตารางเทรนเนอร์
CREATE TABLE IF NOT EXISTS trainers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  expertise VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ตารางห้อง
CREATE TABLE IF NOT EXISTS rooms (
  rid INT PRIMARY KEY AUTO_INCREMENT,
  description TEXT NOT NULL,
  room_type ENUM('yoga', 'pilates', 'dance') NOT NULL,
  gender_type ENUM('male', 'female', 'unspecified') DEFAULT 'unspecified',
  status ENUM('available', 'occupied', 'maintenance') NOT NULL,
  time_slot ENUM(
    '08:00:00-10:30:00',
    '11:30:00-13:00:00',
    '14:00:00-16:30:00',
    '17:00:00-19:30:00',
    '20:00:00-22:30:00'
  ) NOT NULL
);

-- ตารางการจอง
CREATE TABLE IF NOT EXISTS booking (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  rid INT,
  trainer_id INT,
  date DATE NOT NULL,
  time_slot ENUM(
    '08:00:00-10:30:00',
    '11:30:00-13:00:00',
    '14:00:00-16:30:00',
    '17:00:00-19:30:00',
    '20:00:00-22:30:00'
  ) NOT NULL,
  status ENUM('pending', 'confirm', 'cancelled') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (rid) REFERENCES rooms(rid),
  FOREIGN KEY (trainer_id) REFERENCES trainers(id)
);

-- เพิ่มข้อมูลห้องเฉพาะเมื่อยังไม่มี room_type นั้น
INSERT INTO rooms (description, room_type, gender_type, status, time_slot)
SELECT * FROM (
  SELECT 'Peaceful yoga space with natural light', 'yoga', 'female', 'available', '08:00:00-10:30:00'
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM rooms WHERE room_type = 'yoga'
);

INSERT INTO rooms (description, room_type, gender_type, status, time_slot)
SELECT * FROM (
  SELECT 'Pilates room with reformer machines', 'pilates', 'unspecified', 'available', '11:30:00-13:00:00'
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM rooms WHERE room_type = 'pilates'
);

INSERT INTO rooms (description, room_type, gender_type, status, time_slot)
SELECT * FROM (
  SELECT 'Dance studio with mirrors and sound system', 'dance', 'male', 'available', '14:00:00-16:30:00'
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM rooms WHERE room_type = 'dance'
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
