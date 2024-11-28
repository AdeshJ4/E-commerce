const express = require('express');
const { getAllOrdersForAdmin, getOrderDetailsForAdmin } = require('../../controllers/admin/orders-controller');

const adminOrderRouter = express.Router();

// /api/admin/order/get
adminOrderRouter.get('/get', getAllOrdersForAdmin);

// /api/admin/order/details/:orderId
adminOrderRouter.get('/details/:orderId', getOrderDetailsForAdmin);


module.exports = adminOrderRouter;