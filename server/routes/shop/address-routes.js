const express = require('express');
const { addAddress, deleteAddress, editAddress,fetchAllAddress  } = require('../../controllers/shop/address-controller');

const addressRouter = express.Router();

// api/shop/address/get/:userId
addressRouter.get('/get/:userId', fetchAllAddress);
// api/shop/address/add
addressRouter.post('/add', addAddress);
// api/shop/address/update/:userId/:addressId
addressRouter.put('/update/:userId/:addressId', editAddress)
//api/shop/address/delete/:userId/:addressId
addressRouter.delete('/delete/:userId/:addressId', deleteAddress);



module.exports = addressRouter;

