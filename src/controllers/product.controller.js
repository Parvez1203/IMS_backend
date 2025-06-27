const { Product, stock_entries } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productList = await Product.findAll();

    res.json(productList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })

    const { name, unit_id, remarks, stock_threshold } = req.body

    await product.update({
      name,
      unit_id,
      remarks,
      stock_threshold,
    })

    res.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the latest stock entry
    const lastEntry = await stock_entries.findOne({
      where: { product_id: id },
      order: [['entry_date', 'DESC']],
    });

    const latestClosingBalance = lastEntry ? lastEntry.closing_balance : 0;

    // Add zeroing entry
    await stock_entries.create({
      product_id: id,
      entry_date: new Date(),
      opening_quantity: 0,
      closing_balance: 0,
      remarks: 'Auto-zeroed before deletion',
    });

    // Soft delete the product
    await Product.update({ is_deleted: true }, { where: { id } });

    res.status(200).json({ message: 'Product soft-deleted and zeroed successfully.' });
  } catch (err) {
    console.error('Error soft-deleting product:', err);
    res.status(500).json({ error: 'Failed to soft-delete product.' });
  }
};
