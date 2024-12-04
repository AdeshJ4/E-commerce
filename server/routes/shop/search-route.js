const express = require('express');
const { searchProducts } = require('../../controllers/shop/search-controller');
const searchRouter = express.Router();

// api/shop/search/:searchText
searchRouter.get("/:searchText", searchProducts);


module.exports = searchRouter;
