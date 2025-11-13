const express = require("express");
const router = express.Router();
const trainerController = require("./trainer.controller");

// Trainer Profile
router.get('/:trainerId', trainerController.getTrainerProfile);
router.put('/:trainerId', trainerController.updateTrainerProfile);

// Booking Management
router.get('/:trainerId/bookings', trainerController.getTrainerBookings);
router.get('/:trainerId/bookings/upcoming', trainerController.getUpcomingBookings);
router.get('/bookings/:bookingId', trainerController.getBookingDetails);
router.patch('/bookings/:bookingId/status', trainerController.updateBookingStatus);
router.patch('/bookings/:bookingId/notes', trainerController.addBookingNotes);

// Client Management
router.get('/:trainerId/clients', trainerController.getTrainerClients);
router.get('/:trainerId/clients/:clientId', trainerController.getClientDetails);
router.get('/:trainerId/clients/:clientId/history', trainerController.getClientHistory);

// Session Management
router.get('/:trainerId/sessions', trainerController.getTrainerSessions);
router.post('/sessions/:sessionId/notes', trainerController.addSessionNotes);

// Statistics
router.get('/:trainerId/statistics', trainerController.getTrainerStatistics);

// Schedule
router.get('/:trainerId/schedule', trainerController.getTrainerSchedule);

module.exports = router;