const express = require('express');
const { addToCart, fetchCartItems, updateCartItemsQty, deleteCartItems} = require('../../controllers/shop/cart-controller');

const cartRouter = express.Router();

cartRouter.post('/add', addToCart);
cartRouter.get('/get/:userId', fetchCartItems);
cartRouter.put('/update-cart', updateCartItemsQty);
cartRouter.delete('/:userId/:productId', updateCartItemsQty);


module.exports = cartRouter;

