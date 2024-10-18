const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Define the signup route
router.post('/signup', signup);
// Define the login route
router.post('/login', login);

module.exports = router;
