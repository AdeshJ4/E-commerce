const express = require('express');
const { addProductReview, getProductReviews} = require('../../controllers/shop/productReviewController');

const productReviewRouter = express.Router();

// api/shop/review/:productId
productReviewRouter.get('/:productId', getProductReviews);


// api/shop/review/add
productReviewRouter.post('/add', addProductReview);


module.exports = productReviewRouter;