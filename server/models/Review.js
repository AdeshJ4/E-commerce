const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// in this collection we are going to store reviews of same or different products
const productReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true, 
      maxlength: 100,
    },
    reviewMessage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, 
    },
    reviewValue: {
      type: Number,
      required: true,
      min: 1, 
      max: 5,
    },
  },
  { timestamps: true }
);




function validateReview(review) {
  const schema = Joi.object({
    productId: Joi.objectId().required(), 
    userId: Joi.objectId().required(),
    userName: Joi.string().max(100).required(),
    reviewMessage: Joi.string().max(500).required(),
    reviewValue: Joi.number().min(1).max(5).required(),
  });

  return schema.validate(review);
}



const ProductReview = mongoose.model("ProductReview", productReviewSchema);
module.exports = { ProductReview, validateReview };






/*
Notes : 

*/