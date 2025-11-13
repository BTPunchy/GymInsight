const db = require("../../db/db");

const getPaymentMethods = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM payment_methods WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addPaymentMethod = (userId, type, cardNumber, cardHolder, expiryDate, isDefault) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO payment_methods (user_id, type, card_number, card_holder, expiry_date, is_default)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, type, cardNumber, cardHolder, expiryDate, isDefault || 0], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, userId, type, cardNumber, cardHolder, expiryDate, isDefault });
    });
  });
};

const updatePaymentMethod = (paymentId, updates) => {
  return new Promise((resolve, reject) => {
    const allowedFields = ["type", "card_number", "card_holder", "expiry_date", "is_default"];
    const fields = [];
    const values = [];

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length === 0) return resolve(null);

    const sql = `UPDATE payment_methods SET ${fields.join(", ")} WHERE id = ?`;
    values.push(paymentId);

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deletePaymentMethod = (paymentId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM payment_methods WHERE id = ?";
    db.query(sql, [paymentId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getMembership = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM memberships WHERE user_id = ? AND status = 'active'";
    db.query(sql, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const createMembership = (userId, type, price, startDate, endDate, autoRenew) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO memberships (user_id, type, price, start_date, end_date, status, auto_renew)
      VALUES (?, ?, ?, ?, ?, 'active', ?)
    `;
    db.query(sql, [userId, type, price, startDate, endDate, autoRenew || 0], (err, result) => {
      if (err) return reject(err);
      resolve({ 
        id: result.insertId, 
        userId, 
        type, 
        price, 
        startDate, 
        endDate, 
        status: 'active', 
        autoRenew 
      });
    });
  });
};

const cancelMembership = (membershipId) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE memberships SET status = 'cancelled', auto_renew = 0 WHERE id = ?";
    db.query(sql, [membershipId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getMembership,
  createMembership,
  cancelMembership
};