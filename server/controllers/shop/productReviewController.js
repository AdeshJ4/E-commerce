const mongoose = require("mongoose");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { ProductReview, validateReview } = require("../../models/Review");
const handleResponse = require("../../utils/handleResponse");

/*
    1. @desc : add Product Review
    2. @route POST : api/shop/review/add
    3. @access public
*/
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    console.log('productId, userId, userName, reviewMessage, reviewValue', productId, userId, userName, reviewMessage, reviewValue);
    

    const order = await Order.findOne({ userId, "cartItems.productId": productId, orderStatus: "confirmed" });
    if(!order) return handleResponse({ res, status: 403, success: false, message: "You need to purchase the product to review it"})

    const checkExistingReview = await ProductReview.findOne({ productId, userId})

    if(checkExistingReview) return handleResponse({ res, status: 400, message: "You already reviewed this product", success: false});

    // check data send by user.
    const { error } = validateReview(req.body);
    if(error) return handleResponse({ res, status: 400, message: error.details[0].message || "Please ensure all fields are properly filled out.", success: false});

    // create a new review.
    const review = new ProductReview({
      productId, userId, userName, reviewMessage, reviewValue
    });

    await review.save();


    const reviews = await ProductReview.find({ productId });
    const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {averageReview}, { new: true });

    return handleResponse({ res, status: 201, data: review, success: true, message: "review submitted"})

  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message || "Internal Server Error", success: false });
  }
}

/*
    1. @desc : get Product Reviews
    2. @route POST :  api/shop/review/:productId
    3. @access public
*/
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check for valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return handleResponse({ res, status: 400, message: "Invalid ObjectId", success: false });
    }

    // Fetch reviews for the product
    const reviews = await ProductReview.find({ productId });

    // Check if reviews exist
    if (reviews.length === 0) {
      return handleResponse({ res, status: 404, message: "No reviews found for this product", success: false });
    }

    // Return the reviews if found
    return handleResponse({ res, status: 200, data: reviews, success: true });

  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message || "Internal Server Error", success: false });
  }
};



const updateProductReview = async (req, res) => {
  try{

  }catch(err){

  }
}

const deleteProductReview = () => {
  try{

  }catch(err){

  }
}

module.exports = { addProductReview, getProductReviews };