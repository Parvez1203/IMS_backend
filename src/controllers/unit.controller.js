const { units } = require('../models');

exports.getAll = async (req, res) => {
  const all = await units.findAll();
  res.json(all);
};

exports.create = async (req, res) => {
  try {
    const unit = await units.create(req.body);
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const unit = await units.findByPk(req.params.id);
  if (!unit) return res.status(404).json({ message: 'Not found' });

  await unit.update(req.body);
  res.json(unit);
};

exports.delete = async (req, res) => {
  const unit = await units.findByPk(req.params.id);
  if (!unit) return res.status(404).json({ message: 'Not found' });

  await unit.destroy();
  res.json({ message: 'Deleted successfully' });
};
