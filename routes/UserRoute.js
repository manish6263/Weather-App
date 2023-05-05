const express = require('express');
const { registerUser, loginUser, getMe, writeRecommendation, getRecommendations } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe);

router.post('/write-a-recommendation', protect, writeRecommendation);

router.get('/recommendations', protect, getRecommendations);

module.exports = router;