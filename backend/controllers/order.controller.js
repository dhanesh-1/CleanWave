import { Order } from "../models/order.models.js";
import { Review } from "../models/review.models.js";

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', '-password')
            .populate('provider', '-password')
            .populate('service');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', '-password')
            .populate('provider', '-password')
            .populate('service');

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { user, provider, service, date, address, totalAmount } = req.body;

        const newOrder = new Order({
            user,
            provider,
            service,
            date,
            address,
            totalAmount,
            orderStatus: "pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        )
            .populate('user provider service');

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get review for a specific order
const getOrderReview = async (req, res) => {
    try {
        const review = await Review.findOne({ order: req.params.id })
            .populate("user", "fullname email")
            .populate("service", "name");

        if (!review) return res.status(404).json({ message: "Review not found for this order" });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderReview
};
