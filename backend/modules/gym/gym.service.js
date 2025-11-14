const gymModel = require("../gym/gym.model");

const createBookingRoomsService = async (
  user_id,
  rid,
  trainer_id,
  date,
  time_start,
  time_end,
  status
) => {
  try {
    const result = await gymModel.createBookingRooms(
      user_id,
      rid,
      trainer_id,
      date,
      time_start,
      time_end,
      status
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getRoomService = async () => {
  return await gymModel.getRooms();
};

const getBookingByUserService = async (user_id) => {
  try {
    const bookings = await gymModel.getBookingByUser(user_id);
    return bookings;
  } catch (err) {
    throw err;
  }
};

const getRoomByIDService = async (user_id) => {
  try {
    const room = await gymModel.getRoomByID(user_id);
    return room;
  } catch (err) {
    throw err;
  }
};

const updatedBookingRoomStatusService = async (booking_id, status) => {
  try {
    const result = await gymModel.updatedBookingRoomStatus(booking_id, status);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteBookingRoomsService = async (booking_id) => {
  try {
    const result = await gymModel.deleteBookingRooms(booking_id);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBookingRoomsService,
  getBookingByUserService,
  getRoomService,
  updatedBookingRoomStatusService,
  deleteBookingRoomsService,
  getRoomByIDService,
};
