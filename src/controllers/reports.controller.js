const { Product, stock_entries, units, production_orders } = require('../models');
const { Op } = require('sequelize');

exports.getStockReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const entries = await stock_entries.findAll({
      where: {
        entry_date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [
        {
    model: Product,
    as: 'product',
    include: [
      {
        model: units,
        as: 'unit',
        attributes: ['name'],
      },
    ]
    },
      ],
      order: [['entry_date', 'DESC']],
    });

    const formatted = entries.map(entry => ({
      id: entry.id,
      productName: entry.product.name,
      unit: entry.product.unit?.name || 'pcs',
      entryDate: entry.entry_date,
      openingQuantity: entry.opening_quantity,
      closingBalance: entry.closing_balance,
      remarks: entry.product.remarks || '',
      status: entry.closing_balance < entry.product.stock_threshold ? 'Low Stock' : 'In Stock',
    }));

    res.json({ data: formatted });
  } catch (error) {
    console.error('Error fetching stock report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getOrdersReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const orders = await production_orders.findAll({
      where: {
        order_date: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: Product,
          as: 'product',
          where: { is_deleted: false },
          attributes: ['name', 'unit_id'],
          include: [
            {
              model: units,
              as: 'unit',
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['order_date', 'DESC']],
    });

    const formatted = orders.map(order => ({
      id: order.id,
      styleName: order.style_name,
      orderDate: order.order_date,
      quantityUsed: order.quantity_used,
      notes: order.notes || '',
      stockEntryId: order.stock_entry_id,
      productName: order.product?.name || 'Unknown',
      unit: order.product?.unit?.name || 'pcs',
    }));

    res.json({ data: formatted });
  } catch (error) {
    console.error('Error fetching orders report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
