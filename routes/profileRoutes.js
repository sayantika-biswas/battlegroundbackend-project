const express = require("express");
const { getProfile, updateProfile, changePassword } = require("../controllers/profileController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// All routes are protected and require admin authentication
router.get("/profile", adminAuth, getProfile);
router.put("/profile", adminAuth, updateProfile);
router.put("/change-password", adminAuth, changePassword);

module.exports = router;