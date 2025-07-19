const express = require("express");
const { register, login, getProfile, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../middleware/validation");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;