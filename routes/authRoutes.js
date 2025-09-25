const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegistration, validateLogin, handleValidationErrors } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validateRegistration, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', protect, getProfile);

module.exports = router;
