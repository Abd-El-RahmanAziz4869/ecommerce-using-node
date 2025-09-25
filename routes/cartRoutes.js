const express = require('express');
const { addToCart, getCart ,updateCart,removeFromCart,clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

const router = express.Router();


router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.put('/', protect, updateCart);
router.delete('/', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

module.exports = router;
