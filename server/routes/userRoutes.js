const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { login } = require('../controllers/userController');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send profile data along with token
    res.status(201).send({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Signup failed', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Dummy user check
    if (email === 'dummy@email.com' && password === 'dummy123') {
      return res.status(200).json({
        message: 'Login successful (dummy user)',
        token: 'dummy-user-token',
        role: 'user',
      });
    }

    // Dummy admin check
    if (email === 'admin@email.com' && password === 'admin123') {
      return res.status(200).json({
        message: 'Login successful (admin)',
        token: 'admin-token',
        role: 'admin',
      });
    }

    const user = await User.findOne({ email });
	   if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return successful login
    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Profile route
const { verifyToken } = require('../middleware');

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Don't return password
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Profile retrieval failed', error });
  }
});

// Admin dashboard route
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied. Admins only.' });
  }
  next();
};

router.get('/admin/dashboard', verifyToken, verifyAdmin, (req, res) => {
  res.send('Admin dashboard');
});

module.exports = router;
