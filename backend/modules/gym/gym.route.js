const express = require("express");
const router = express.Router();
const gymController = require("../gym/gym.controller");

router.get('/', gymController.getRooms); //ดึงข้อมูล room ทั้งหมด

router.post('/bookings', gymController.createBookingRooms);
router.get('/bookings/user/:user_id', gymController.getBookingByUser);
router.get('/user/:user_id', gymController.getRoomByID);
router.put('/bookings/:booking_id/status', gymController.updatedBookingRoomStatus);
router.delete('/bookings/:booking_id', gymController.deleteBookingRooms);

module.exports = router;
