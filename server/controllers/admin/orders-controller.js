const mongoose = require('mongoose');
const Order = require("../../models/Order");
const handleResponse = require("../../utils/handleResponse");

/*
    1. @desc : get All Orders
    2. @route GET : /api/admin/order/get
    3. @access public
*/
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0)
      return handleResponse({ res, success: false, message: "No Orders Found", status: 404 })

    return handleResponse({ res, status: 200, data: orders, success: true, message: "Orders fetched successfully for admin" })

  } catch (err) {
    return handleResponse({ res, status: 500, message: err?.message || "An unexpected error occurred", success: false });
  }
}


/*
    1. @desc : get Order Details
    2. @route GET : /api/admin/order/details/:id
    3. @access public
*/
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return handleResponse({
        res,
        status: 400,
        message: 'Missing required field: orderId',
        success: false
      });
    }

    const order = await Order.findById(id);

    if (!order) return handleResponse({ res, success: false, message: "No Order found", status: 404 });

    return handleResponse({ res, data: order, message: "Order fetch successfully", status: 200, success: true })
  } catch (err) {
    return handleResponse({ res, message: err.message || "An unexpected error occurred", status: 500, success: false })
  }
}



/*
    1. @desc : update Order Details
    2. @route GET : /api/admin/order/update/:id
    3. @access public
*/
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    
    if (!id) {
      return handleResponse({ res, status: 400, message: 'Missing required field: orderId', success: false })
    }

    const order = await Order.findById(id);
    if (!order) return handleResponse({ res, status: 404, message: "Order Not Found", data: order, success: false });

    const updatedOrder = await Order.findByIdAndUpdate(id,{ orderStatus },{ new: true } );

    return handleResponse({ res, status: 200, data: updatedOrder, message: "Order Status Updated successfully", success: true });
  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message || "An unexpected error occurred", success: false })
  }
}



module.exports = { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus };