const express = require("express");
const router = express.Router();
const userControl = require("./user.controller");

router.post("/register", userControl.register);
router.delete("/:userName", userControl.deleteUser);
router.put("/:userName", userControl.updatesUser);
router.post("/login", userControl.loginUser);

module.exports = router;
