const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/stock', reportsController.getStockReport);
router.get('/orders', reportsController.getOrdersReport);

module.exports = router;
