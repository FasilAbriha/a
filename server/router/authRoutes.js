// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/password-reset', authController.sendPasswordResetEmail);
router.post('/reset', authController.resetPassword);

module.exports = router;
