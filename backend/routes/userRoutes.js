const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const router = express.Router();

// Get all providers
router.get("/providers", async (req, res) => {
  try {
    const providers = await User.find({ 
      role: "provider", 
      isActive: true 
    }).select("name email phone providerDetails");

    res.json({ success: true, providers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch providers", error: error.message });
  }
});

// Get available delivery personnel (admin only)
router.get("/delivery-personnel", protect, allowRoles("admin", "provider"), async (req, res) => {
  try {
    const deliveryPersonnel = await User.find({ 
      role: "delivery", 
      isActive: true,
      "deliveryDetails.isAvailable": true 
    }).select("name email phone deliveryDetails");

    res.json({ success: true, deliveryPersonnel });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch delivery personnel", error: error.message });
  }
});

module.exports = router;