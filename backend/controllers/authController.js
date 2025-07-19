const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d"
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, providerDetails, deliveryDetails } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user
    const userData = {
      name,
      email,
      password,
      role: role || "user",
      phone,
      address,
    };

    // Add role-specific details
    if (role === "provider" && providerDetails) {
      userData.providerDetails = providerDetails;
    }
    if (role === "delivery" && deliveryDetails) {
      userData.deliveryDetails = deliveryDetails;
    }

    const newUser = new User(userData);
    await newUser.save();

    // Update last login
    newUser.lastLogin = new Date();
    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed", 
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // Don't allow password updates through this endpoint
    delete updates.email; // Don't allow email updates without verification
    
    const user = await User.findByIdAndUpdate(req.user.id, updates, { 
      new: true, 
      runValidators: true 
    });
    
    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Profile update failed", error: error.message });
  }
};