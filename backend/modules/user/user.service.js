const userModel = require("./user.model");

const bcrypt = require("bcrypt");

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

const updateUserService = async (userName, updates) => {
  const existingUser = await new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(new Error("User not found"));
      resolve(user);
    });
  });

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

  const result = await userModel.updateUser(userName, mergedUpdates);
  if (!result || result.affectedRows === 0) {
    throw new Error("Update failed");
  }

  return { success: true, message: "User updated successfully" };
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

const getUserService = (userName) => {
  return new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(new Error("User not found"));
      resolve(user);
    });
  });
};

module.exports = {
  registerService,
  deleteUserService,
  updateUserService,
  loginUserService,
  getUserService,
};
