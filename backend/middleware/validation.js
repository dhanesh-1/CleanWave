const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};

const validateRegister = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone").matches(/^[0-9]{10}$/).withMessage("Phone must be 10 digits"),
  body("role").optional().isIn(["user", "provider", "delivery"]).withMessage("Invalid role"),
  handleValidationErrors
];

const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors
];

const validatePayment = [
  body("items").isArray({ min: 1 }).withMessage("Items array is required"),
  body("items.*.name").notEmpty().withMessage("Item name is required"),
  body("items.*.price").isNumeric({ min: 0 }).withMessage("Item price must be positive"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Item quantity must be at least 1"),
  handleValidationErrors
];

module.exports = { validateRegister, validateLogin, validatePayment };