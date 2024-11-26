const express = require('express');
const { createOrder, captureOrder } = require('../../controllers/shop/orderController');

const orderRouter = express.Router();

// /api/shop/order/create
orderRouter.post('/create', createOrder)

module.exports = orderRouter;