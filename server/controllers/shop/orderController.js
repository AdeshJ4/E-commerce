const paypal = require('../../helpers/paypal');
const handleResponse = require("../../utils/handleResponse")
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

/*
    1. @desc : Create Order
    2. @route POST : api/shop/order/create
    3. @access public
*/
const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;


        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {

            if (error) {
                console.log('Error paypal payment ', error);
                // error while creating paypal payment
                return handleResponse({ res, status: 500, message: error.message, success: false })
            } else {
                const order = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });
                await order.save();


                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;

                return res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId:  order._id
                })                
            }
        });


    } catch (err) {
        return handleResponse({ res, status: 500, message: err.message, success: false });
    }
}



/*
    1. @desc : capture Order
    2. @route POST : api/shop/order/capture
    3. @access public
*/
const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

         // Validate required fields
         if (!paymentId || !payerId || !orderId) {
            return handleResponse({
                res,
                status: 400,
                message: 'Missing required fields: paymentId, payerId, or orderId',
                success: false
            });
        }

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return handleResponse({
                res,
                status: 404,
                message: 'Order not found',
                success: false
            });
        }

        // Update order details
        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;


         // Find and clear the associated cart
         const cart = await Cart.findById(order.cartId);
         console.log('Before cart', cart);
         
         if (cart) {
             cart.items = [];
             await cart.save(); // Save the updated cart
             console.log('After cart', cart);
         } else {
             console.warn(`Cart with ID ${order.cartId} not found.`);
         }

        // Save the updated order
        await order.save();

        return handleResponse({ res, success: true, message: "Order Confirmed", data: order, status: 200 })
    } catch (err) {
        return handleResponse({ res, status: 500, message: err.message, success: false })
    }
}

 
/*
    1. @desc : get All Orders
    2. @route POST : /api/shop/order/list/:userId
    3. @access public
*/
const getAllOrders = async ( req, res ) => {
    try{
        const { userId } = req.params;
        const orders = await Order.find({userId});        
        if(!orders.length) return handleResponse({ res, success: false, message: "No Orders found", status: 404});

        return handleResponse({ res, data: orders, message: "Orders fetch successfully", status: 200, success: true})
    }catch(err){
        return handleResponse({ res, message: err.message, status: 500, success: false })
    }
}

/*
    1. @desc : get Order Details
    2. @route POST : api/shop/order/details/:id
    3. @access public
*/
const getOrderDetails = async ( req, res ) => {
    try{
        const { id } = req.params;
        const order = await Order.findById(id);
        if(!order) return handleResponse({ res, success: false, message: "No Order found", status: 404});

        return handleResponse({ res, data: order, message: "Order fetch successfully", status: 200, success: true})
    }catch(err){
        return handleResponse({ res, message: err.message, status: 500, success: false })
    }
}
 


module.exports = { createOrder, capturePayment, getAllOrders, getOrderDetails }