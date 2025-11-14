const db = require("../../db/db");
const createUser = (
  userName,
  fName,
  lName,
  password,
  age,
  height,
  weight,
  diseases,
  sex,
  BMI
) => {
  db.query(
    "INSERT INTO users (userName, fName, lName, password, age, height, weight, diseases, sex, BMI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [userName, fName, lName, password, age, height, weight, diseases, sex, BMI]
  );
  return {
    id: db.insertId,
    userName,
    fName,
    lName,
    password,
    age,
    height,
    weight,
    diseases,
  };
};

const deleteUser = (userName, callback) => {
  db.query(
    "DELETE FROM users WHERE userName = ?",
    [userName],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result); // มี result.affectedRows
    }
  );
};

const getUser = (userName, callback) => {
  db.query(
    "SELECT * FROM users WHERE userName = ?",
    [userName],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); // คืนแถวแรก
    }
  );
};

const updateUser = (userName, updates) => {
  return new Promise((resolve, reject) => {
    const allowedFields = [
      "userName",
      "fName",
      "lName",
      "password",
      "age",
      "height",
      "weight",
      "diseases",
      "sex",
      "BMI",
    ];
    const fields = [];
    const values = [];

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length === 0) return resolve(null);

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE userName = ?`;
    values.push(userName);

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
};
