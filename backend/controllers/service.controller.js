import { Service } from '../models/service.models.js';
import { Review } from '../models/review.models.js';
import { User } from '../models/user.models.js';

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'fullname email');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'fullname email');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch service', error: error.message });
  }
};

// Create a new service (only for provider)
const createService = async (req, res) => {

  try {
    const { title, description, price, category, provider } = req.body;
    
    // Optional: validate provider is actually a provider role
    const existingProvider = await User.findOne({ _id: provider, role: 'provider' });
    if (!existingProvider) {
      return res.status(400).json({ message: 'Invalid provider ID' });
    }

    const newService = new Service({
      title,
      description,
      price,
      category,
      provider
    });

    await newService.save();

    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated', service: updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
};

// Get all reviews for a service
const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.id }).populate('user', 'fullname');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch service reviews', error: error.message });
  }
};

export {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceReviews
};
