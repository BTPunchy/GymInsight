const express = require("express");
const router = express.Router();
const userControl = require("./user.controller");

router.post("/register", userControl.register); //สร้าง user ใหม่
router.delete("/:userName", userControl.deleteUser); // ลบ user
router.put("/:userName", userControl.updateUserHandler); //แก้ไข้ข้อมูลส่วนตัวของ user สามารถเปลี่ยนข้อมูลได้หมดเลย
router.post("/login", userControl.loginUser); // login
router.get("/:userName", userControl.getUser); // ดึงข้อมูล user โดยใช้ userName

module.exports = router;
