const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const router = express.Router();

// Get user's orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user.id })
      .populate("provider", "name email providerDetails")
      .populate("deliveryPerson", "name phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: req.user.id });

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// Get order by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("provider", "name email providerDetails")
      .populate("deliveryPerson", "name phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns this order or is a provider/admin
    if (order.user._id.toString() !== req.user.id && 
        req.user.role !== "admin" && 
        order.provider._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
});

// Update order status (for providers and delivery personnel)
router.patch("/:id/status", protect, allowRoles("provider", "delivery", "admin"), async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    
    if (orderStatus === "delivered") {
      order.actualDeliveryTime = new Date();
    }
    
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
});

module.exports = router;