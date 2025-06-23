const { cloth_sizes } = require('../models');

exports.getAll = async (req, res) => {
  const sizes = await cloth_sizes.findAll();
  res.json(sizes);
};

exports.create = async (req, res) => {
  try {
    const size = await cloth_sizes.create(req.body);
    res.status(201).json(size);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const size = await cloth_sizes.findByPk(req.params.id);
  if (!size) return res.status(404).json({ message: 'Not found' });

  await size.update(req.body);
  res.json(size);
};

exports.delete = async (req, res) => {
  const size = await cloth_sizes.findByPk(req.params.id);
  if (!size) return res.status(404).json({ message: 'Not found' });

  await size.destroy();
  res.json({ message: 'Deleted successfully' });
};
