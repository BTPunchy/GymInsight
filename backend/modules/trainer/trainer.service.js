const trainerModel = require("./trainer.model");

// ==================== TRAINER PROFILE ====================
const getTrainerProfileService = async (trainerId) => {
  try {
    const trainer = await trainerModel.getTrainerProfile(trainerId);
    if (!trainer) {
      throw new Error("Trainer not found");
    }
    return trainer;
  } catch (err) {
    throw err;
  }
};

const updateTrainerProfileService = async (trainerId, updates) => {
  try {
    const trainer = await trainerModel.getTrainerProfile(trainerId);
    if (!trainer) {
      throw new Error("Trainer not found");
    }
    
    const result = await trainerModel.updateTrainerProfile(trainerId, updates);
    return result;
  } catch (err) {
    throw err;
  }
};

// ==================== BOOKING MANAGEMENT ====================
const getTrainerBookingsService = async (trainerId, status, date, startDate, endDate) => {
  try {
    const filters = {};
    if (status) filters.status = status;
    if (date) filters.date = date;
    if (startDate && endDate) {
      filters.startDate = startDate;
      filters.endDate = endDate;
    }
    
    const bookings = await trainerModel.getTrainerBookings(trainerId, filters);
    
    // Count sessions for each client
    for (let booking of bookings) {
      const sessions = await trainerModel.getTrainerSessions(trainerId, { 
        clientId: booking.user_id 
      });
      booking.client_total_sessions = sessions.length;
      booking.is_new_client = sessions.length === 0;
    }
    
    return bookings;
  } catch (err) {
    throw err;
  }
};

const getUpcomingBookingsService = async (trainerId) => {
  try {
    return await trainerModel.getUpcomingBookings(trainerId);
  } catch (err) {
    throw err;
  }
};

const getBookingDetailsService = async (bookingId) => {
  try {
    const booking = await trainerModel.getBookingById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (err) {
    throw err;
  }
};

const updateBookingStatusService = async (bookingId, status, notes) => {
  try {
    const booking = await trainerModel.getBookingById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    
    const result = await trainerModel.updateBookingStatus(bookingId, status, notes);
    
    // If completed, create a session record
    if (status === 'completed') {
      // Calculate duration in hours
      const startTime = booking.time_start.split(':');
      const endTime = booking.time_end.split(':');
      const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
      const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
      const duration = (endMinutes - startMinutes) / 60;
      
      await trainerModel.createSession(
        bookingId,
        booking.user_id,
        booking.trainer_id,
        booking.date,
        booking.time_start,
        booking.time_end,
        duration,
        notes || booking.notes || ''
      );
    }
    
    return result;
  } catch (err) {
    throw err;
  }
};

const addBookingNotesService = async (bookingId, notes) => {
  try {
    const booking = await trainerModel.getBookingById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return await trainerModel.addBookingNotes(bookingId, notes);
  } catch (err) {
    throw err;
  }
};

// ==================== CLIENT MANAGEMENT ====================
const getTrainerClientsService = async (trainerId) => {
  try {
    return await trainerModel.getTrainerClients(trainerId);
  } catch (err) {
    throw err;
  }
};

const getClientDetailsService = async (trainerId, clientId) => {
  try {
    const client = await trainerModel.getClientById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    
    // Get booking history
    const bookingHistory = await trainerModel.getClientBookingHistory(trainerId, clientId);
    
    // Get session history
    const sessionHistory = await trainerModel.getClientSessionHistory(trainerId, clientId);
    
    // Calculate statistics
    const totalSessions = sessionHistory.length;
    const totalBookings = bookingHistory.length;
    const avgDuration = totalSessions > 0 
      ? sessionHistory.reduce((sum, s) => sum + parseFloat(s.duration), 0) / totalSessions 
      : 0;
    
    return {
      ...client,
      bookingHistory,
      sessionHistory,
      statistics: {
        totalSessions,
        totalBookings,
        averageSessionDuration: avgDuration.toFixed(2),
        firstBooking: bookingHistory[bookingHistory.length - 1]?.date || null,
        lastBooking: bookingHistory[0]?.date || null
      }
    };
  } catch (err) {
    throw err;
  }
};

const getClientHistoryService = async (trainerId, clientId, limit, offset) => {
  try {
    const sessions = await trainerModel.getClientSessionHistory(trainerId, clientId, limit, offset);
    
    // Get total count (without pagination)
    const allSessions = await trainerModel.getClientSessionHistory(trainerId, clientId);
    
    return {
      total: allSessions.length,
      sessions
    };
  } catch (err) {
    throw err;
  }
};

// ==================== SESSION MANAGEMENT ====================
const getTrainerSessionsService = async (trainerId, startDate, endDate, clientId) => {
  try {
    const filters = {};
    if (startDate && endDate) {
      filters.startDate = startDate;
      filters.endDate = endDate;
    }
    if (clientId) {
      filters.clientId = clientId;
    }
    
    return await trainerModel.getTrainerSessions(trainerId, filters);
  } catch (err) {
    throw err;
  }
};

const addSessionNotesService = async (sessionId, notes) => {
  try {
    return await trainerModel.addSessionNotes(sessionId, notes);
  } catch (err) {
    throw err;
  }
};

// ==================== STATISTICS ====================
const getTrainerStatisticsService = async (trainerId, period) => {
  try {
    const today = new Date();
    let startDate = new Date(0); // All time by default
    
    switch (period) {
      case 'week':
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
    }
    
    const stats = await trainerModel.getTrainerStatistics(trainerId, startDate);
    const upcomingCount = await trainerModel.getUpcomingBookingsCount(trainerId);
    
    return {
      period: period || 'all_time',
      totalSessions: stats.total_sessions || 0,
      totalHours: parseFloat(stats.total_hours || 0).toFixed(2),
      uniqueClients: stats.unique_clients || 0,
      upcomingBookings: upcomingCount,
      averageSessionDuration: parseFloat(stats.avg_session_duration || 0).toFixed(2)
    };
  } catch (err) {
    throw err;
  }
};

// ==================== SCHEDULE ====================
const getTrainerScheduleService = async (trainerId, date) => {
  try {
    const bookings = await trainerModel.getTrainerSchedule(trainerId, date);
    return {
      date: date || 'all',
      bookings: bookings.map(b => ({
        id: b.booking_id,
        startTime: b.time_start,
        endTime: b.time_end,
        clientName: `${b.fName} ${b.lName}`,
        status: b.status
      }))
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getTrainerProfileService,
  updateTrainerProfileService,
  getTrainerBookingsService,
  getUpcomingBookingsService,
  getBookingDetailsService,
  updateBookingStatusService,
  addBookingNotesService,
  getTrainerClientsService,
  getClientDetailsService,
  getClientHistoryService,
  getTrainerSessionsService,
  addSessionNotesService,
  getTrainerStatisticsService,
  getTrainerScheduleService
};