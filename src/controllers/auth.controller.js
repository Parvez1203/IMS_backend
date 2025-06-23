const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, unique_employee_id, position, department, joining_date, password } = req.body;
    
    const existing = await User.findOne({ where: { unique_employee_id } });
    if (existing) return res.status(400).json({ message: 'Employee already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      unique_employee_id,
      position,
      department,
      joining_date,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { unique_employee_id, password } = req.body;

    const user = await User.findOne({ where: { unique_employee_id } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, unique_employee_id: user.unique_employee_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
