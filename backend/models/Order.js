const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentId: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  orderStatus: {
    type: String,
    enum: ["placed", "confirmed", "preparing", "ready", "picked_up", "delivered", "cancelled"],
    default: "placed"
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  notes: String
}, { timestamps: true });

// Generate order number
orderSchema.pre("save", async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD${Date.now()}${count + 1}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
