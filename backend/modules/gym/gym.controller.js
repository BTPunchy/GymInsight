const gymService = require("../gym/gym.service");
const { createRoom } = require("./gym.model");

const createBookingRooms = async (req, res) => {
  try {
    const { user_id, rid, trainer_id, date, time_start, time_end, status } = req.body;

    if (!user_id || !date || !time_start || !time_end) {
      return res.status(400).json({success: false, message: "Missing required fields: user_id, date, time_start, or time_end"});
    }

    const result = await gymService.createBookingRoomsService(
      user_id, rid, trainer_id,
      date, time_start, time_end, status
    );

    res.status(201).json({success: true, message: "Booking created successfully", data: result});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message});
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await gymService.getRoomService();
    console.log(rooms);
    res.status(200).json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRoomByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ success: false, message: "Missing user_id" });
    }

    const bookings = await gymService.getRoomByUserService(user_id);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const updatedBookingRoomStatus = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Missing status field"
      });
    }

    const result = await gymService.updatedBookingRoomStatusService(booking_id, status);

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const deleteBookingRooms = async (req, res) => {
  try {
    const { booking_id } = req.params;

    if (!booking_id) {
      return res.status(400).json({
        success: false,
        message: "Missing booking_id"
      });
    }

    const result = await gymService.deleteBookingRoomsService(booking_id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getRooms,
  createBookingRooms,
  getRoomByUser,
  updatedBookingRoomStatus,
  deleteBookingRooms
};
