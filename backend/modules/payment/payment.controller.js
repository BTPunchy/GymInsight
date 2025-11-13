const paymentService = require("./payment.service");

const getPaymentMethods = async (req, res) => {
  try {
    const { userId } = req.params;
    const methods = await paymentService.getPaymentMethodsService(userId);
    res.status(200).json({ success: true, data: methods });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addPaymentMethod = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, cardNumber, cardHolder, expiryDate, isDefault } = req.body;
    
    const result = await paymentService.addPaymentMethodService(
      userId, type, cardNumber, cardHolder, expiryDate, isDefault
    );
    
    res.status(201).json({ success: true, message: "Payment method added", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const updates = req.body;
    
    const result = await paymentService.updatePaymentMethodService(paymentId, updates);
    res.status(200).json({ success: true, message: "Payment method updated", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const { paymentId } = req.params;
    await paymentService.deletePaymentMethodService(paymentId);
    res.status(200).json({ success: true, message: "Payment method deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMembership = async (req, res) => {
  try {
    const { userId } = req.params;
    const membership = await paymentService.getMembershipService(userId);
    res.status(200).json({ success: true, data: membership });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const subscribeMembership = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, price, durationMonths, autoRenew } = req.body;
    
    const result = await paymentService.subscribeMembershipService(
      userId, type, price, durationMonths, autoRenew
    );
    
    res.status(201).json({ success: true, message: "Membership created", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const cancelMembership = async (req, res) => {
  try {
    const { membershipId } = req.params;
    const result = await paymentService.cancelMembershipService(membershipId);
    res.status(200).json({ success: true, message: "Membership cancelled", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getMembership,
  subscribeMembership,
  cancelMembership
};