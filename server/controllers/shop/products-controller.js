const Product = require("../../models/Product");
const handleResponse = require("../../utils/handleResponse");


/*
1. @desc : Get products
2. @route GET : /api/shop/products
3. @access public

ex:  GET /api/shop/products/get?category=men%2Cwomen&brand=nike%2Cadidas&sortBy=price-lowtohigh 
ex:  GET /api/shop/products/get?category=&brand=&sortBy=title-ztoa   // if you don't select anything
*/

const getFilteredProducts = async (req, res) => {
  try{
    const { category = '', brand = '', sortBy = "price-lowtohigh"} = req.query;

    let filters = {};

    if(category.length){
      filters.category = { $in: category.split(',')}   // db.Product.find({category: {$in: ["men", "women"]}})
    }
    
    if(brand.length){
      filters.brand = { $in: brand.split(',')}
    }

    let sort = {};


    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1
        break;
      case 'price-hightolow':
        sort.price = -1
        break;
      case 'title-atoz':
        sort.title = 1
        break;
      case 'title-ztoa':
        sort.title = -1
        break;

      default:
        sort.price = 1
        break;
    }

    console.log('filters', filters);  //  {category: { '$in': [ 'men', 'women' ] }, brand: { '$in': [ 'nike', 'puma' ] }}
    console.log('sort', sort);   // { price: 1 }
    

    const products = await Product.find(filters).sort(sort);  // db.Product.find({category: { '$in': [ 'men', 'women' ] }, brand: { '$in': [ 'nike', 'puma' ] }}).sort({ price: 1 })

    return handleResponse({res, status: 200, data: products, message: 'Products fetched successfully', success: true});
  }catch(err){
    return handleResponse({ res, status: 500, message: 'Some Internal Error Occured', success: false})
  }
}

const getProductDetailsById = async (req, res) => {
  try{
    const { id } = req.params;
    console.log('req.params', req.params);
    
    const product = await Product.findById(id);
    if(!product) return handleResponse({res, status: 404, success: false, message: `The product with given id ${id} not found`});
    return handleResponse({res, status: 200, data: product, success: true, message: `The product with given id ${id} found`});
  }catch(err){
    return handleResponse({res, status: 500, success: false, message: err.message});
  }
}

module.exports = { getFilteredProducts, getProductDetailsById }; 