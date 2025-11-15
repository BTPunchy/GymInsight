const express = require("express");
const router = express.Router();
const gymController = require("../gym/gym.controller");

router.get("/", gymController.getRooms); //ดึงข้อมูล room ทั้งหมด

router.post("/bookings", gymController.createBookingRooms);
router.get("/bookings/user/:user_id", gymController.getBookingByUser);
router.get("/user/:user_id", gymController.getRoomByID);
router.put(
  "/bookings/:booking_id/status",
  gymController.updatedBookingRoomStatus
);
router.delete("/bookings/:booking_id", gymController.deleteBookingRooms);
router.get("/:room_type", gymController.getRoomByType); //ดึงข้อมูล room ตามประเภท

router.put("/:room_id/status", gymController.updatedRoomStatus);

module.exports = router;
