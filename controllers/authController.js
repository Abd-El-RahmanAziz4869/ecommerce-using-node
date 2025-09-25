
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already used' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ user: { id: user._id, name, email, role }, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ user: { id: user._id, name: user.name, email, role: user.role }, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProfile = (req, res) => res.json({ user: req.user });
