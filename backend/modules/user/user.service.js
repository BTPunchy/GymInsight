const userModel = require("./user.model");

const registerService = (userName, fName, lName, password, age, height, weight, diseases, sex, BMI) => {
    try{
        const existingUser = userModel.getUser(userName);
        if(existingUser){
            throw new Error("User already exists");
        }
        
        if(userName == undefined || fName == undefined || lName == undefined ||
            password == undefined || age == undefined || height == undefined || weight == undefined ||
        sex == undefined || BMI == undefined){
            throw new Error("Please fill in all required fields except diseases");
        }

        if ( isNaN(age) || age <= 0||
        isNaN(height) || height <= 0 ||
        isNaN(weight) || weight <= 0  ||
        isNaN(BMI) || BMI <= 0

    ){
        throw new Error("Age, height, and weight must be valid positive numbers");
    }
    return userModel.createUser(userName, fName, lName, password, age, height, weight, diseases, sex, BMI || null);
    }catch(err){
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

const updatesUserService = (userName, updates) => {
  return new Promise((resolve, reject) => {
    userModel.getUser(userName, (err, existingUser) => {
      if (err) return reject(err);
      if (!existingUser) return reject(new Error("User not found"));

      const allowedFields = [
        "userName", "fName", "lName", "password", "age",
        "height", "weight", "diseases", "sex", "BMI"
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

module.exports = {
    registerService, 
    deleteUserService,
    updatesUserService
}