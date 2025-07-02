const { stock_entries, Product } = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
/**
 * Create new stock entry
 * Computes closing_balance = last_closing_balance + opening_quantity
 */
// exports.createStockEntry = async (req, res) => {
//   try {
//     const { product_id, entry_date, opening_quantity, rate = 0, remarks } = req.body;

//     if (!product_id || !entry_date || !opening_quantity) {
//       return res.status(400).json({ message: "Missing required fields: product_id, entry_date, opening_quantity, or rate." });
//     }

//     const lastEntry = await stock_entries.findOne({
//       where: { product_id },
//       order: [['entry_date', 'DESC']],
//     });
//     console.log(`----${lastEntry}`)

//     const previousBalance = lastEntry?.closing_balance || 0;
//     const closing_balance = previousBalance + Number(opening_quantity);

//     const entry = await stock_entries.create({
//       product_id,
//       entry_date,
//       opening_quantity,
//       closing_balance,
//       rate,
//       remarks: remarks || "",
//     });

//     res.status(201).json(entry);
//   } catch (err) {
//     console.error("Error creating stock entry:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };

exports.createStockEntry = async (req, res) => {
  try {
    const { product_id, entry_date, opening_quantity, rate = 0, remarks } = req.body;

    if (!product_id || !entry_date || !opening_quantity) {
      return res.status(400).json({
        message: "Missing required fields: product_id, entry_date, opening_quantity, or rate.",
      });
    }

    // Fetch the latest entry (ordered by entry_date and createdAt)
    const lastEntry = await stock_entries.findOne({
      where: { product_id },
      order: [
        ['entry_date', 'DESC'],
        ['createdAt', 'DESC']
      ],
    });

    const previousBalance = lastEntry?.closing_balance || 0;
    const closing_balance = previousBalance + Number(opening_quantity);

    const entry = await stock_entries.create({
      product_id,
      entry_date,
      opening_quantity,
      closing_balance,
      rate,
      remarks: remarks || "",
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error("Error creating stock entry:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};



/**
 * Get all stock entries, with associated product name
 */
// exports.getAllStockEntries = async (req, res) => {
//   try {
//     const entries = await stock_entries.findAll({
//       include: [{ model: Product, as: 'product', attributes: ['name'] }],
//       order: [['entry_date', 'DESC']]
//     });
//     res.json(entries);
//   } catch (err) {
//     console.error("Error fetching stock entries:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getAllStockEntries = async (req, res) => {
  try {
    const entries = await sequelize.query(
      `
      SELECT DISTINCT ON (se.product_id) se.*
      FROM stock_entries se
      ORDER BY se.product_id, se.entry_date DESC, se."createdAt" DESC;
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    // Add product name manually
    const enriched = await Promise.all(
      entries.map(async (entry) => {
        const product = await Product.findByPk(entry.product_id, {
          attributes: ['name'],
        });
        return {
          ...entry,
          product: product ? { name: product.name } : null,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("Error fetching latest stock entries per product:", err);
    res.status(500).json({ error: err.message });
  }
};


/**
 * Get one stock entry by ID
 */
exports.getStockEntryById = async (req, res) => {
  try {
    const entry = await stock_entries.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }

    res.status(200).json(entry);
  } catch (err) {
    console.error("Error fetching stock entry:", err);
    res.status(500).json({ error: "Failed to fetch entry", details: err.message });
  }
};

/**
 * Get stock history for a product
 */
exports.getStockHistoryByProductId = async (req, res) => {
  try {
    const entries = await stock_entries.findAll({
      where: { product_id: req.params.id },
      order: [['entry_date', 'DESC']],
    });

    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching product stock history:", err);
    res.status(500).json({ error: "Failed to fetch stock history", details: err.message });
  }
};


// Get all stock entries for a product
exports.getStockByProductId = async (req, res) => {
  try {
    const entries = await stock_entries.findAll({
      where: { product_id: req.params.id },
      order: [['entry_date', 'DESC'], ['createdAt', 'DESC']],
    });
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching stock for product:", err);
    res.status(500).json({ error: err.message });
  }
};