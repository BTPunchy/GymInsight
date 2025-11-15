const gymService = require("../gym/gym.service");
const { createRoom } = require("./gym.model");

const createBookingRooms = async (req, res) => {
  try {
    const { user_id, rid, trainer_id, date, time_slot, status } = req.body;

    if (!user_id || !date || !time_slot) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id, date, or time_slot",
      });
    }

    const result = await gymService.createBookingRoomsService(
      user_id,
      rid,
      trainer_id,
      date,
      time_slot,
      status
    );

    await gymService.updatedRoomStatus(rid, "occupied");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

const getBookingByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing user_id" });
    }

    const bookings = await gymService.getBookingByUserService(user_id);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRoomByID = async (req, res) => {
  try {
    const { user_id } = req.params;
    const room = await gymService.getRoomByIDService(user_id);
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRoomByType = async (req, res) => {
  try {
    const { room_type } = req.params;
    const room = await gymService.getRoomByTypeService(room_type);
    res.status(200).json({ success: true, data: room });
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
        message: "Missing status field",
      });
    }

    const result = await gymService.updatedBookingRoomStatusService(
      booking_id,
      status
    );

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteBookingRooms = async (req, res) => {
  try {
    const { booking_id } = req.params;

    if (!booking_id) {
      return res.status(400).json({
        success: false,
        message: "Missing booking_id",
      });
    }

    const result = await gymService.deleteBookingRoomsService(booking_id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatedRoomStatus = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Missing status field",
      });
    }

    const result = await gymService.updatedRoomStatus(room_id, status);

    res.status(200).json({
      success: true,
      message: "Room status updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getRooms,
  createBookingRooms,
  getBookingByUser,
  updatedBookingRoomStatus,
  deleteBookingRooms,
  getRoomByID,
  getRoomByType,
  updatedRoomStatus,
};
