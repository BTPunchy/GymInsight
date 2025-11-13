const db = require("../../db/db");

// ==================== TRAINER PROFILE ====================
const getTrainerProfile = (trainerId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT t.*, u.userName, u.fName, u.lName, u.age, u.sex
      FROM trainers t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `;
    db.query(sql, [trainerId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const updateTrainerProfile = (trainerId, updates) => {
  return new Promise((resolve, reject) => {
    const allowedFields = ["expertise", "experience", "bio", "rating"];
    const fields = [];
    const values = [];

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length === 0) return resolve(null);

    const sql = `UPDATE trainers SET ${fields.join(", ")} WHERE id = ?`;
    values.push(trainerId);

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// ==================== BOOKING MANAGEMENT ====================
const getTrainerBookings = (trainerId, filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT b.*, u.userName, u.fName, u.lName, u.weight, u.height, u.age
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.trainer_id = ?
    `;
    const params = [trainerId];

    if (filters.status) {
      sql += " AND b.status = ?";
      params.push(filters.status);
    }

    if (filters.date) {
      sql += " AND b.date = ?";
      params.push(filters.date);
    }

    if (filters.startDate && filters.endDate) {
      sql += " AND b.date BETWEEN ? AND ?";
      params.push(filters.startDate, filters.endDate);
    }

    sql += " ORDER BY b.date, b.time_start";

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getUpcomingBookings = (trainerId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT b.*, u.userName, u.fName, u.lName, u.weight, u.height
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.trainer_id = ? 
        AND b.status != 'cancelled'
        AND b.date >= CURDATE()
        AND b.date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
      ORDER BY b.date, b.time_start
    `;
    db.query(sql, [trainerId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getBookingById = (bookingId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT b.*, u.userName, u.fName, u.lName, u.weight, u.height, u.age, u.sex, u.diseases
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.booking_id = ?
    `;
    db.query(sql, [bookingId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const updateBookingStatus = (bookingId, status, notes) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE booking SET status = ?";
    const params = [status];

    if (notes !== undefined) {
      sql += ", notes = ?";
      params.push(notes);
    }

    sql += " WHERE booking_id = ?";
    params.push(bookingId);

    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addBookingNotes = (bookingId, notes) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE booking SET notes = ? WHERE booking_id = ?";
    db.query(sql, [notes, bookingId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// ==================== SESSION MANAGEMENT ====================
const createSession = (bookingId, clientId, trainerId, date, timeStart, timeEnd, duration, notes) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO sessions (booking_id, client_id, trainer_id, date, time_start, time_end, duration, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [bookingId, clientId, trainerId, date, timeStart, timeEnd, duration, notes], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getTrainerSessions = (trainerId, filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT s.*, u.userName, u.fName, u.lName
      FROM sessions s
      JOIN users u ON s.client_id = u.id
      WHERE s.trainer_id = ?
    `;
    const params = [trainerId];

    if (filters.clientId) {
      sql += " AND s.client_id = ?";
      params.push(filters.clientId);
    }

    if (filters.startDate && filters.endDate) {
      sql += " AND s.date BETWEEN ? AND ?";
      params.push(filters.startDate, filters.endDate);
    }

    sql += " ORDER BY s.completed_at DESC";

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addSessionNotes = (sessionId, notes) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE sessions SET notes = ? WHERE id = ?";
    db.query(sql, [notes, sessionId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// ==================== CLIENT MANAGEMENT ====================
const getTrainerClients = (trainerId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT DISTINCT u.id, u.userName, u.fName, u.lName, u.age, u.weight, u.height, u.sex, u.diseases,
        (SELECT COUNT(*) FROM booking WHERE user_id = u.id AND trainer_id = ?) as total_bookings,
        (SELECT COUNT(*) FROM sessions WHERE client_id = u.id AND trainer_id = ?) as completed_sessions,
        (SELECT COUNT(*) FROM booking WHERE user_id = u.id AND trainer_id = ? AND status = 'comfirm' AND date >= CURDATE()) as upcoming_bookings,
        (SELECT MIN(date) FROM booking WHERE user_id = u.id AND trainer_id = ?) as first_booking,
        (SELECT MAX(date) FROM booking WHERE user_id = u.id AND trainer_id = ?) as last_booking
      FROM users u
      JOIN booking b ON u.id = b.user_id
      WHERE b.trainer_id = ?
    `;
    db.query(sql, [trainerId, trainerId, trainerId, trainerId, trainerId, trainerId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getClientById = (clientId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [clientId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const getClientBookingHistory = (trainerId, clientId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM booking 
      WHERE trainer_id = ? AND user_id = ?
      ORDER BY date DESC, time_start DESC
    `;
    db.query(sql, [trainerId, clientId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getClientSessionHistory = (trainerId, clientId, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT * FROM sessions 
      WHERE trainer_id = ? AND client_id = ?
      ORDER BY completed_at DESC
    `;
    
    const params = [trainerId, clientId];
    
    if (limit) {
      sql += " LIMIT ? OFFSET ?";
      params.push(parseInt(limit), parseInt(offset) || 0);
    }

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// ==================== STATISTICS ====================
const getTrainerStatistics = (trainerId, startDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        COUNT(*) as total_sessions,
        SUM(duration) as total_hours,
        COUNT(DISTINCT client_id) as unique_clients,
        AVG(duration) as avg_session_duration
      FROM sessions
      WHERE trainer_id = ? AND completed_at >= ?
    `;
    db.query(sql, [trainerId, startDate], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const getUpcomingBookingsCount = (trainerId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as count
      FROM booking
      WHERE trainer_id = ? AND status = 'comfirm' AND date >= CURDATE()
    `;
    db.query(sql, [trainerId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};

// ==================== SCHEDULE ====================
const getTrainerSchedule = (trainerId, date) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT b.booking_id, b.time_start, b.time_end, b.status, u.fName, u.lName
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.trainer_id = ? AND b.status != 'cancelled'
    `;
    const params = [trainerId];

    if (date) {
      sql += " AND b.date = ?";
      params.push(date);
    }

    sql += " ORDER BY b.time_start";

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getTrainerProfile,
  updateTrainerProfile,
  getTrainerBookings,
  getUpcomingBookings,
  getBookingById,
  updateBookingStatus,
  addBookingNotes,
  createSession,
  getTrainerSessions,
  addSessionNotes,
  getTrainerClients,
  getClientById,
  getClientBookingHistory,
  getClientSessionHistory,
  getTrainerStatistics,
  getUpcomingBookingsCount,
  getTrainerSchedule
};