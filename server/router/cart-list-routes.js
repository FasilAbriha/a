const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, removeFromCart } = require('../controller/cart-controller');
const tokenHandler = require('../middleware/tokenHandler');

// GET /api/cart-list
router.get('/cart-list', tokenHandler, getCartItems);

// POST /api/add-to-cart
router.post('/add-to-cart', tokenHandler, addToCart);

// DELETE /api/remove-from-cart/:id
router.delete('/remove-from-cart/:id', tokenHandler, removeFromCart);

module.exports = router;
