const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const handleResponse = require("../../utils/handleResponse");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return handleResponse({ res, status: 200, data: result, message: 'Image Uploaded Successfully', success: true})
  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false})
  }
};

const addProduct = async (req, res) => {
  try {
    console.log('req.body', req.body);
    
    const product = await Product.create(req.body);
    console.log('product from backend ', product);
    
    return handleResponse({
      res,
      status: 201,
      data: product,
      success: true,
      message: "Product Created Successfully",
    });
  } catch (err) {
    return handleResponse({
      res,
      status: 500,
      message: err.message,
      success: false,
    });
  }
};
// const addProduct = async (req, res) => {
//   try {
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//     } = req.body;

//     const product = new Product({
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//     });

//     await product.save();

//     return res.status(201).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    return handleResponse({
      res,
      status: 200,
      data: listOfProducts,
      success: true,
    });
  } catch (err) {
    return handleResponse({
      res,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUp(id, req.body, { new: true });

    // if product is not found
    if (!product)
      return handleResponse({
        res,
        status: 404,
        message: `The Product with given id ${id} not found`,
        success: false,
      });

    // if product found
    return handleResponse({
      res,
      status: 200,
      data: product,
      success: true,
      message: "Product edited successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
// const editProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//     } = req.body;

//     const product = await Product.findById(id);
//     if (!product)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });

//     product.image = image || product.image;
//     product.title = title || product.title;
//     product.description = description || product.description;
//     product.category = category || product.category;
//     product.brand = brand || product.brand;
//     product.price = price || product.price;
//     product.salePrice = salePrice || product.salePrice;
//     product.totalStock = totalStock || product.totalStock;

//     await product.save();

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    // if product is not found
    if (!product)
      return handleResponse({
        res,
        status: 400,
        message: `The Product with given id ${id} not found`,
        success: false,
      });

    // if product found
    return handleResponse({
      res,
      status: 200,
      message: "Product deleted successfully",
      success: true,
    });
  } catch (err) {
    return handleResponse({
      res,
      status: 500,
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
