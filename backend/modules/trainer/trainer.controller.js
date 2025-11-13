const trainerService = require("./trainer.service");

// ==================== TRAINER PROFILE ====================
const getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const trainer = await trainerService.getTrainerProfileService(trainerId);
    res.status(200).json({ success: true, data: trainer });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const updates = req.body;
    const result = await trainerService.updateTrainerProfileService(trainerId, updates);
    res.status(200).json({ success: true, message: "Profile updated", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== BOOKING MANAGEMENT ====================
const getTrainerBookings = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { status, date, startDate, endDate } = req.query;
    
    const bookings = await trainerService.getTrainerBookingsService(
      trainerId, status, date, startDate, endDate
    );
    
    res.status(200).json({ success: true, total: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUpcomingBookings = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const bookings = await trainerService.getUpcomingBookingsService(trainerId);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await trainerService.getBookingDetailsService(bookingId);
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, notes } = req.body;
    
    const result = await trainerService.updateBookingStatusService(bookingId, status, notes);
    res.status(200).json({ success: true, message: "Status updated", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addBookingNotes = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { notes } = req.body;
    
    const result = await trainerService.addBookingNotesService(bookingId, notes);
    res.status(200).json({ success: true, message: "Notes added", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== CLIENT MANAGEMENT ====================
const getTrainerClients = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const clients = await trainerService.getTrainerClientsService(trainerId);
    res.status(200).json({ success: true, total: clients.length, data: clients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getClientDetails = async (req, res) => {
  try {
    const { trainerId, clientId } = req.params;
    const client = await trainerService.getClientDetailsService(trainerId, clientId);
    res.status(200).json({ success: true, data: client });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getClientHistory = async (req, res) => {
  try {
    const { trainerId, clientId } = req.params;
    const { limit, offset } = req.query;
    
    const history = await trainerService.getClientHistoryService(
      trainerId, clientId, limit, offset
    );
    
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== SESSION MANAGEMENT ====================
const getTrainerSessions = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { startDate, endDate, clientId } = req.query;
    
    const sessions = await trainerService.getTrainerSessionsService(
      trainerId, startDate, endDate, clientId
    );
    
    res.status(200).json({ success: true, total: sessions.length, data: sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addSessionNotes = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { notes } = req.body;
    
    const result = await trainerService.addSessionNotesService(sessionId, notes);
    res.status(200).json({ success: true, message: "Notes added", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== STATISTICS ====================
const getTrainerStatistics = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { period } = req.query;
    
    const stats = await trainerService.getTrainerStatisticsService(trainerId, period);
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== SCHEDULE ====================
const getTrainerSchedule = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { date } = req.query;
    
    const schedule = await trainerService.getTrainerScheduleService(trainerId, date);
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTrainerProfile,
  updateTrainerProfile,
  getTrainerBookings,
  getUpcomingBookings,
  getBookingDetails,
  updateBookingStatus,
  addBookingNotes,
  getTrainerClients,
  getClientDetails,
  getClientHistory,
  getTrainerSessions,
  addSessionNotes,
  getTrainerStatistics,
  getTrainerSchedule
};