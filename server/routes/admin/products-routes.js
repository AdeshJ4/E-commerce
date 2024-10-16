const express = require('express');
const { handleImageUpload, addProduct, deleteProduct, editProduct, fetchAllProducts } = require('../../controllers/admin/products-controller');
const { upload } = require('../../helpers/cloudinary');
const productRouter = express.Router();

productRouter.get('/get', fetchAllProducts)
productRouter.post('/upload-image', upload.single('my_file'), handleImageUpload);
productRouter.post('/add', addProduct);
productRouter.put('/edit/:id', editProduct);
productRouter.delete('/delete/:id', deleteProduct)

module.exports = productRouter;