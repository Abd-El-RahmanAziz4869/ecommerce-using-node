
const Order = require('../models/Order');
const Cart = require('../models/Cart');


exports.createOrderFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart || cart.products.length === 0) return res.status(400).json({ message: 'Cart empty' });

  let total = 0;
  const orderItems = cart.products.map(i => {
    total += i.priceAt * i.quantity;
    return { product: i.product._id, quantity: i.quantity, priceAt: i.priceAt };
  });

  const order = await Order.create({ user: req.user._id, products: orderItems, totalPrice: total });
  cart.products = []; await cart.save(); 
  res.status(201).json(order);
};


exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name');
  res.json(orders);
};
