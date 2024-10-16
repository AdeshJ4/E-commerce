const express = require('express');
const { getFilteredProducts, getProductDetailsById } = require('../../controllers/shop/products-controller');



const shopProductRouter = express.Router();


shopProductRouter.get('/get', getFilteredProducts);
shopProductRouter.get('/get/:id', getProductDetailsById);



module.exports = shopProductRouter;