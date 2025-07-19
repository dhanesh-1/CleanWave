const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, providerId, notes } = req.body;
    const userId = req.user.id;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order in database first
    const order = new Order({
      user: userId,
      provider: providerId,
      items,
      totalAmount,
      deliveryAddress,
      notes
    });
    await order.save();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Amount in paise
      currency: "INR",
      receipt: order.orderNumber,
      payment_capture: 1, // Auto capture
      notes: {
        orderId: order._id.toString(),
        userId: userId,
        orderNumber: order.orderNumber
      }
    });

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderDetails: order,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to create payment order", 
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // Update order status
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.paymentId = razorpay_payment_id;
    order.paymentStatus = "completed";
    order.orderStatus = "confirmed";
    await order.save();

    // Populate order details for response
    await order.populate([
      { path: "user", select: "name email phone" },
      { path: "provider", select: "name email phone providerDetails" }
    ]);

    res.json({
      success: true,
      message: "Payment verified successfully",
      order
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

exports.handlePaymentWebhook = async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (webhookSignature !== expectedSignature) {
      return res.status(400).json({ message: "Webhook signature verification failed" });
    }

    const { event, payload } = req.body;

    switch (event) {
      case "payment.captured":
        // Handle successful payment
        const payment = payload.payment.entity;
        const orderId = payment.notes.orderId;
        
        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: "completed",
            paymentId: payment.id
          });
        }
        break;

      case "payment.failed":
        // Handle failed payment
        const failedPayment = payload.payment.entity;
        const failedOrderId = failedPayment.notes.orderId;
        
        if (failedOrderId) {
          await Order.findByIdAndUpdate(failedOrderId, {
            paymentStatus: "failed"
          });
        }
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};