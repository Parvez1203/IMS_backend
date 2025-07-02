const { production_orders, stock_entries, Product } = require('../models');

// POST /api/orders
exports.createProductionOrder = async (req, res) => {
    try {
        const { style_name, order_date, product_id, stock_entry_id, quantity_used, notes } = req.body;

        if (!style_name || !order_date || !product_id || !stock_entry_id || !quantity_used) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const stockEntry = await stock_entries.findByPk(stock_entry_id);
        if (!stockEntry) return res.status(404).json({ message: "Stock entry not found." });

        if (stockEntry.closing_balance < quantity_used) {
            return res.status(400).json({ message: "Insufficient stock for this entry." });
        }

        stockEntry.closing_balance -= quantity_used;
        await stockEntry.save();

        const order = await production_orders.create({
            style_name,
            order_date,
            product_id,
            stock_entry_id,
            quantity_used,
            notes: notes || "",
        });

        res.status(201).json(order);
    } catch (err) {
        console.error("Error creating production order:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/orders
exports.getAllProductionOrders = async (req, res) => {
    try {
        const orders = await production_orders.findAll({
            include: [{ model: Product, as: 'product' }],
            order: [['createdAt', 'DESC']],
            limit: 20,
        });

        res.status(200).json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: err.message });
    }
};
