const Product = require("../../models/Product");
const handleResponse = require("../../utils/handleResponse");

const getFilteredProducts = async (req, res) => {
  try{
    const products = await Product.find({});

    return handleResponse({res, status: 200, data: products, message: 'Products fetched successfully', success: true});
  }catch(err){
    return handleResponse({ res, status: 500, message: 'Some Internal Error Occured', success: false})
  }
}


module.exports = { getFilteredProducts }; 