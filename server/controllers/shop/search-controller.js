const Product = require('../../models/Product');
const handleResponse = require("../../utils/handleResponse");


/*
    1. @desc : search the product
    2. @route GET : /api/shop/search/:searchText
    3. @access public
*/

const searchProducts = async (req, res) => {
  try{
    const { searchText } = req.params;    
    
    if(!searchText || typeof searchText !== 'string'){
      return handleResponse({ res, status: 400, success: false, message: "searchText is required and must be a string" })
    }

    const regEx = new RegExp(searchText, 'i');

    const createQuery = {
      $or: [
        {title: regEx},
        {description: regEx},
        {category: regEx},
        {brand: regEx},
      ]
    }

    const searchResults = await Product.find(createQuery);

    return handleResponse({ res, status: 200, data: searchResults, message: "results", success: true});

  }catch(err){
    return handleResponse({ res, status: 500, message: err.message || "Internal server error", success: false })
  }
}


module.exports = { searchProducts };