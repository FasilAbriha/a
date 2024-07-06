const express = require("express");
const { registerUsers, loginUsers, userStatus, logoutUsers } = require("../controllers/user-controller");
const router = express.Router();

// Registration route
router.post("/register", registerUsers);

// Login route
router.post("/login", loginUsers);

// User status route
router.get("/status", userStatus);

// Logout route
router.post("/logout", logoutUsers);

module.exports = router;
