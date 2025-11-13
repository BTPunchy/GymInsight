const userModel = require("./user.model");

const bcrypt = require("bcrypt");
const { get } = require("./user.route");

const registerService = async (
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
  try {
    const existingUser = await new Promise((resolve, reject) => {
      userModel.getUser(userName, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    if (
      !userName ||
      !fName ||
      !lName ||
      !password ||
      !age ||
      !height ||
      !weight ||
      !sex ||
      !BMI
    ) {
      throw new Error("Please fill in all required fields except diseases");
    }

    if (
      isNaN(age) ||
      age <= 0 ||
      isNaN(height) ||
      height <= 0 ||
      isNaN(weight) ||
      weight <= 0 ||
      isNaN(BMI) ||
      BMI <= 0
    ) {
      throw new Error(
        "Age, height, weight, and BMI must be valid positive numbers"
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    return await userModel.createUser(
      userName,
      fName,
      lName,
      hashedPassword,
      age,
      height,
      weight,
      diseases || null,
      sex,
      BMI
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserService = (userName) => {
  return new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const deleteUserService = (userName) => {
  return new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, existingUser) => {
      if (err) return reject(err);
      if (!existingUser) return reject(new Error("User not found"));

      userModel.deleteUser(userName, (err, result) => {
        if (err) return reject(err);
        if (!result || result.affectedRows === 0) {
          return reject(new Error("Failed to delete user"));
        }

        resolve({ success: true, message: "User deleted successfully" });
      });
    });
  });
};

const updatesUserService = (userName, updates) => {
  return new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, existingUser) => {
      if (err) return reject(err);
      if (!existingUser) return reject(new Error("User not found"));

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

      const mergedUpdates = {};
      for (const field of allowedFields) {
        mergedUpdates[field] =
          updates[field] !== undefined ? updates[field] : existingUser[field];
      }

      userModel.updatesUser(userName, mergedUpdates, (err, result) => {
        if (err) return reject(err);
        if (!result || result.affectedRows === 0) {
          return reject(new Error("Update failed"));
        }

        resolve({ success: true, message: "User updated successfully" });
      });
    });
  });
};

const loginUserService = async (userName, password) => {
  try {
    const existingUser = await new Promise((resolve, reject) => {
      userModel.getUser(userName, (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error("User not found"));
        resolve(user);
      });
    });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return existingUser;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  registerService,
  deleteUserService,
  updatesUserService,
  loginUserService,
  getUserService,
};
