const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorizeRoles('seller', 'admin'), createProduct);
router.get('/', getProducts);

module.exports = router;
