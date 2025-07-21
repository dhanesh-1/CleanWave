import { User } from "../models/user.models.js";
import { Service } from "../models/service.models.js";

// Get all providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" }).select("-password");
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch providers", error: error.message });
  }
};

// Get provider by ID
const getProviderById = async (req, res) => {
  try {
    const provider = await User.findOne({ _id: req.params.id, role: "provider" }).select("-password");
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch provider", error: error.message });
  }
};

// Create new provider
const createProvider = async (req, res) => {
  try {
    const { username, fullname, email, password, phone } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newProvider = new User({
      username,
      fullname,
      email,
      password,
      phone,
      role: "provider"
    });

    await newProvider.save();

    res.status(201).json({ message: "Provider created successfully", provider: newProvider });
  } catch (error) {
    res.status(500).json({ message: "Failed to create provider", error: error.message });
  }
};

// Update provider details
const updateProvider = async (req, res) => {
  try {
    const updatedProvider = await User.findOneAndUpdate(
      { _id: req.params.id, role: "provider" },
      req.body,
      { new: true }
    );

    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({ message: "Provider updated", provider: updatedProvider });
  } catch (error) {
    res.status(500).json({ message: "Failed to update provider", error: error.message });
  }
};

// Delete provider
const deleteProvider = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ _id: req.params.id, role: "provider" });
    if (!deleted) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete provider", error: error.message });
  }
};

// Get services by provider
const getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.params.id });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
};

export {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  getProviderServices
};
