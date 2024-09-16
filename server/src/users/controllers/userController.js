const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await User.createUser(email, password, name, role);
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.send({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
