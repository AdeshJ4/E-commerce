const express = require('express');
const { getFilteredProducts } = require('../../controllers/shop/products-controller');



const shopProductRouter = express.Router();


shopProductRouter.get('/get', getFilteredProducts);



module.exports = shopProductRouter;