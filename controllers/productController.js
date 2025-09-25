
const Product = require('../models/Product');
const User = require('../models/User');


exports.createProduct = async (req, res) => {
  const { name, description, price, photo } = req.body;
  const product = await Product.create({ name, description, price, photo, seller: req.user._id });
  res.status(201).json(product);
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

