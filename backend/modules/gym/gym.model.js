const db = require("../../db/db");
//ดูห้องทั้งหมด
const getRooms = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM rooms", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getRoomByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM booking WHERE user_id = ?";
    db.query(sql, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getRoomByType = (type) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rooms WHERE room_type = ?";
    db.query(sql, [type], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const createBookingRooms = (
  user_id,
  rid,
  trainer_id,
  date,
  time_start,
  time_end,
  status
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO booking (user_id, rid, trainer_id, date, time_start, time_end, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        user_id,
        rid || null,
        trainer_id || null,
        date,
        time_start,
        time_end,
        status || "Pending",
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const updatedBookingRoomStatus = (booking_id, status) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE booking SET status = ? WHERE booking_id = ?";
    db.query(sql, [status, booking_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteBookingRooms = (booking_id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM booking WHERE booking_id = ?";
    db.query(sql, [booking_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getRooms,
  getRoomByUser,
  createBookingRooms,
  deleteBookingRooms,
  updatedBookingRoomStatus,
  getRoomByType,
};
