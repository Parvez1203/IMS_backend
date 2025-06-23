const { product_categories } = require('../models');

exports.getAll = async (req, res) => {
  const categories = await product_categories.findAll();
  res.json(categories);
};

exports.create = async (req, res) => {
  try {
    const category = await product_categories.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const category = await product_categories.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  await category.update(req.body);
  res.json(category);
};

exports.delete = async (req, res) => {
  const category = await product_categories.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  await category.destroy();
  res.json({ message: 'Deleted successfully' });
};
