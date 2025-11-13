const paymentModel = require("./payment.model");

const getPaymentMethodsService = async (userId) => {
  try {
    return await paymentModel.getPaymentMethods(userId);
  } catch (err) {
    throw err;
  }
};

const addPaymentMethodService = async (userId, type, cardNumber, cardHolder, expiryDate, isDefault) => {
  try {
    if (!type || !cardNumber || !cardHolder || !expiryDate) {
      throw new Error("Missing required fields");
    }
    return await paymentModel.addPaymentMethod(userId, type, cardNumber, cardHolder, expiryDate, isDefault);
  } catch (err) {
    throw err;
  }
};

const updatePaymentMethodService = async (paymentId, updates) => {
  try {
    return await paymentModel.updatePaymentMethod(paymentId, updates);
  } catch (err) {
    throw err;
  }
};

const deletePaymentMethodService = async (paymentId) => {
  try {
    return await paymentModel.deletePaymentMethod(paymentId);
  } catch (err) {
    throw err;
  }
};

const getMembershipService = async (userId) => {
  try {
    const membership = await paymentModel.getMembership(userId);
    if (!membership) {
      throw new Error("No active membership found");
    }
    return membership;
  } catch (err) {
    throw err;
  }
};

const subscribeMembershipService = async (userId, type, price, durationMonths, autoRenew) => {
  try {
    // Check if user already has active membership
    const existingMembership = await paymentModel.getMembership(userId);
    if (existingMembership) {
      throw new Error("User already has active membership");
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (durationMonths || 1));

    return await paymentModel.createMembership(
      userId, 
      type, 
      price, 
      startDate, 
      endDate, 
      autoRenew
    );
  } catch (err) {
    throw err;
  }
};

const cancelMembershipService = async (membershipId) => {
  try {
    return await paymentModel.cancelMembership(membershipId);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPaymentMethodsService,
  addPaymentMethodService,
  updatePaymentMethodService,
  deletePaymentMethodService,
  getMembershipService,
  subscribeMembershipService,
  cancelMembershipService
};