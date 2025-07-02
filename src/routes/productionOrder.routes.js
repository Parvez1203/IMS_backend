const express = require('express');
const router = express.Router();
const controller = require('../controllers/productionOrder.controller');

router.post('/', controller.createProductionOrder);
router.get('/', controller.getAllProductionOrders);

module.exports = router;

