const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.post('/', stockController.createStockEntry);
router.get('/', stockController.getAllStockEntries);

module.exports = router;
