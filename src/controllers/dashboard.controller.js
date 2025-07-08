const { Product, production_orders, stock_entries } = require("../models")
const { Op, Sequelize } = require("sequelize")

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Total Products
        const totalProducts = await Product.count()

        // 2. Total Pieces (latest stock entries summed by closing_balance)
        const latestEntries = await stock_entries.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('product_id')), 'product_id'],
                'closing_balance',
                'entry_date',
                'id'
            ],
            order: [['entry_date', 'DESC'], ['id', 'DESC']]
        })

        const latestStockMap = new Map()
        for (const entry of latestEntries) {
            const pid = entry.product_id
            if (!latestStockMap.has(pid)) {
                latestStockMap.set(pid, entry.closing_balance || 0)
            }
        }
        const totalPieces = Array.from(latestStockMap.values()).reduce((a, b) => a + b, 0)

        // 3. Low Stock Products (based on latest closing_balance and stock_threshold)
        const products = await Product.findAll({
            attributes: ['id', 'name', 'stock_threshold'],
        })

        const lowStockProducts = []
        for (const p of products) {
            const balance = latestStockMap.get(p.id) || 0
            if (balance < p.stock_threshold) {
                lowStockProducts.push({
                    id: p.id,
                    name: p.name,
                    closing_balance: balance,
                    entry_date: latestEntries.find(e => e.product_id === p.id)?.entry_date || null
                })
            }
        }

        // 4. Recent Production Orders (last 3 days or max 20)
        const threeDaysAgo = new Date()
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

        const recentOrders = await production_orders.findAll({
            where: {
                order_date: {
                    [Op.gte]: threeDaysAgo
                }
            },
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name"]
                }
            ],
            order: [["order_date", "DESC"]],
            limit: 20
        })

        return res.json({
            totalProducts,
            totalStock: totalPieces,
            lowStockItems: lowStockProducts,
            recentProductionOrders: recentOrders,
            recentEntries: latestEntries.slice(0, 10).map((e) => ({
                id: e.id,
                product_id: e.product_id,
                entry_date: e.entry_date,
            }))
        })
    } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}
