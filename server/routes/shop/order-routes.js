const express = require('express');
const { createOrder, capturePayment, getAllOrders, getOrderDetails } = require('../../controllers/shop/orderController');

const orderRouter = express.Router();

// /api/shop/order/create
orderRouter.post('/create', createOrder);


// /api/shop/order/capture
orderRouter.post('/capture', capturePayment);


// /api/shop/order/list/:userId
orderRouter.get('/list/:userId', getAllOrders);


// /api/shop/order/details/:id
orderRouter.get('/details/:id', getOrderDetails);

module.exports = orderRouter;