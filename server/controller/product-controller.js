// controllers/productController.js

const Product = require('../model/product-model');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const newProduct = await Product.create({ name, price, description, imageUrl });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Search for products
exports.searchProducts = async (req, res) => {
    const { query } = req.query;
    try {
      const products = await Product.find({
        name: { $regex: query, $options: 'i' }
      }).exec();
  
      if (products.length === 0) {
        return res.json({ message: "No results" });
      }
  
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };