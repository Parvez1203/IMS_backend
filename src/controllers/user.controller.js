const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Get all users
exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Get one user
exports.getOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Create user
exports.create = async (req, res) => {
  try {
    const { first_name, last_name, unique_employee_id, position, department, joining_date, password } = req.body;

    const existing = await User.findOne({ where: { unique_employee_id } });
    if (existing) return res.status(400).json({ message: 'Employee already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      unique_employee_id,
      position,
      department,
      joining_date,
      password: hashed
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update(req.body);
  res.json(user);
};

// Soft delete (is_active = false)
exports.delete = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update({ is_active: false });
  res.json({ message: 'User deactivated' });
};
