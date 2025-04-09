
const express = require('express');
const { verifyToken } = require('../middleware/auth');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Public routes
router.post('/otp/send', authController.sendOTP);
router.post('/otp/verify', authController.verifyOTP);
router.post('/social', authController.socialLogin);

// Protected routes
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
