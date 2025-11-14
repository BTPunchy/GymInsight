const gymModel = require("../gym/gym.model");
const { get } = require("./gym.route");

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

const getRoomByUserService = async (user_id) => {
  try {
    const bookings = await gymModel.getRoomByUser(user_id);
    return bookings;
  } catch (err) {
    throw err;
  }
};

const getRoomByTypeService = async (type) => {
  try {
    const rooms = await gymModel.getRoomByType(type);
    return rooms;
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
  getRoomByUserService,
  getRoomService,
  updatedBookingRoomStatusService,
  deleteBookingRoomsService,
  getRoomByTypeService,
};
