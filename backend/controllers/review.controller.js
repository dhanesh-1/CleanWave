import { Review } from '../models/review.models.js';
import { User } from '../models/user.models.js';
import { Service } from '../models/service.models.js';

// GET all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'fullname email')
            .populate('service', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user', 'fullname email')
            .populate('service', 'name');

        if (!review) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create review
const createReview = async (req, res) => {
    try {
        const { user, service, order, rating, remark } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) return res.status(400).json({ message: 'Invalid user ID' });

        const existingService = await Service.findById(service);
        if (!existingService) return res.status(400).json({ message: 'Invalid service ID' });

        const newReview = new Review({ user, service, order, rating, remark });
        await newReview.save();

        res.status(201).json({ message: 'Review created', review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT update review
const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json({ message: 'Review updated', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE review
const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
