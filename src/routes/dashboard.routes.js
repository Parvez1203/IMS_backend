const express = require("express")
const router = express.Router()
const dashboardController = require("../controllers/dashboard.controller")
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);
router.get("/", dashboardController.getDashboardStats)

module.exports = router
