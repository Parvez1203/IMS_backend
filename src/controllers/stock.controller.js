const { stock_entries, products } = require('../models');

exports.createStockEntry = async (req, res) => {
  try {
    const entry = await stock_entries.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStockEntries = async (req, res) => {
  try {
    const entries = await stock_entries.findAll({
      include: [{ model: products, attributes: ['name'] }],
      order: [['entry_date', 'DESC']]
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockEntryById = async (req, res) => {
  try {
    const entry = await stock_entries.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockHistoryByProductId = async (req, res) => {
  try {
    const entries = await stock_entries.findAll({
      where: { product_id: req.params.id },
      order: [['entry_date', 'DESC']]
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
