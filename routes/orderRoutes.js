const express = require('express');
const { createOrderFromCart, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrderFromCart);
router.get('/my', protect, getMyOrders);

module.exports = router;
