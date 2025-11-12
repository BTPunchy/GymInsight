const userService = require("./user.service");
const bcrypt = require('bcrypt');
const register = async (req, res) => {
    const {userName, fName, lName, password, age, height, weight, diseases, sex, BMI} = req.body;
    try {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        const user = await userService.registerService(userName, fName, lName, password, age, height, weight, diseases, sex, BMI);

        res.status(201).json(user);
    } catch (err){
        res.status(400).json({error: err.message});
    }
}

const deleteUser = async (req, res) => {
    try{
        console.log("params:", req.params); 
        const{userName} = req.params;
        const result = await userService.deleteUserService(userName);
        return res.status(200).json(result);
    } catch(err){
        return res.status(400).json({success:false, message: err.message});
    }
};

const updatesUser = async (req, res) => {
    try{
        
        const { userName } = req.params;
        const updates = req.body;
        const result = await userService.updatesUserService(userName, updates);

        return res.status(200).json(result);
    } catch(err){
        return res.status(400).json({success:false, message: err.message});
    }
 };

const loginUser = async (req, res) => {
    try{
        const { userName, password } = req.body;

        if (!userName || !password) {
        return res.status(400).json({ success: false, message: err.message });
        }

        const result = await userService.loginUserService(userName, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
            }
        );
    } catch(err){
        return res.status(401).json({ success: false, message: err.message });
    }
}

module.exports = {
    register,
    deleteUser,
    updatesUser,
    loginUser
}