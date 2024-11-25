const paypal = require('../../helpers/paypal');
const handleResponse = require("../../utils/handleResponse")
const Order = require('../../models/Order');


const createOrder = async (req, res) => {
    try {
        const {
            userId,
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


const captureOrder = async (req, res) => {
    try {

    } catch (err) {
        return handleResponse({ res, status: 500, message: err.message, success: false })
    }
}

module.exports = { createOrder, captureOrder }