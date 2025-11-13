const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");

// Payment Methods
router.get('/users/:userId/payment-methods', paymentController.getPaymentMethods);
router.post('/users/:userId/payment-methods', paymentController.addPaymentMethod);
router.put('/payment-methods/:paymentId', paymentController.updatePaymentMethod);
router.delete('/payment-methods/:paymentId', paymentController.deletePaymentMethod);

// Membership
router.get('/users/:userId/membership', paymentController.getMembership);
router.post('/users/:userId/membership/subscribe', paymentController.subscribeMembership);
router.post('/memberships/:membershipId/cancel', paymentController.cancelMembership);

module.exports = router;