
const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = new Cart({ user: req.user._id, products: [] });

  const idx = cart.products.findIndex(i => i.product.toString() === productId);
  if (idx > -1) cart.products[idx].quantity += quantity;
  else cart.products.push({ product: productId, quantity, priceAt: product.price });

  await cart.save();
  res.json(await Cart.findById(cart._id).populate('products.product', 'name price'));
};


exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

 
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

   
    const idx = cart.products.findIndex(
      (i) => i.product.toString() === productId
    );

    if (idx === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

  
    cart.products[idx].quantity = quantity;

 
    await cart.save();

    
    const updatedCart = await Cart.findById(cart._id).populate(
      "products.product",
      "name price"
    );

    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.products = cart.products.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(await Cart.findById(cart._id).populate('products.product', 'name price'));
};


exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = []; 
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product', 'name price');
  if (!cart) return res.status(404).json({ message: 'Cart empty' });
  res.json(cart);
};
