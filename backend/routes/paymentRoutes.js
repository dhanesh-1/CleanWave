const express = require("express");
const { 
  createRazorpayOrder, 
  verifyPayment, 
  handlePaymentWebhook 
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const { validatePayment } = require("../middleware/validation");
const router = express.Router();

router.post("/create-order", protect, validatePayment, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);
router.post("/webhook", handlePaymentWebhook); // No auth middleware for webhooks

module.exports = router;