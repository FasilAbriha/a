// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/product-controller');

router.get('/products', productController.getAllProducts);
router.post('/upload-product', productController.createProduct);
router.get('/search-products', productController.searchProducts);

module.exports = router;
