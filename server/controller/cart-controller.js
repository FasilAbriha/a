const Cart = require('../model/Cart-model');

// GET /api/cart-list
// Get user's cart items
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using JWT authentication and extracting user ID from token

    // Find all cart items for the current user
    const cartItems = await Cart.find({ userId }).populate('productId');

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/add-to-cart
// Add an item to user's cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the item already exists in the cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If item does not exist, create a new cart item
      cartItem = new Cart({
        userId,
        productId,
        quantity
      });
    }

    await cartItem.save();

    res.json({ message: 'Item added to cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/remove-from-cart/:id
// Remove an item from user's cart
exports.removeFromCart = async (req, res) => {
  const itemId = req.params.id; // ID of the cart item to remove

  try {
    // Find the cart item by ID and remove it
    await Cart.findByIdAndRemove(itemId);

    res.json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
