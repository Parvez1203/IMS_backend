const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.post('/', stockController.createStockEntry);
router.get('/', stockController.getAllStockEntries);
router.get("/history/:id", stockController.getStockHistoryByProductId);
router.get("/product/:id", stockController.getStockByProductId);

module.exports = router;
