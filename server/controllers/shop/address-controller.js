const handleResponse = require("../../utils/handleResponse");
const Address = require("../../models/Address");

/*
    1. @desc : Add Address
    2. @route POST : api/shop/address/add
    3. @access public
*/
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return handleResponse({ res, status: 400, message: "Invalid data provided", success: false })
    }

    const newAddress = new Address({
      userId, address, city, pincode, phone, notes
    });

    await newAddress.save();


    return handleResponse({
      res,
      status: 201,
      data: newAddress,
      success: true,
      message: "New Address Added Successfully",
    })
  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
}





/*
    1. @desc : edit Address
    2. @route POST : api/shop/address/update/:userId/:addressId
    3. @access public
*/
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if(!userId || !addressId) return handleResponse({ res, status: 400, message: "userId and addressIs is missing", success: false});

    const address = await Address.findOneAndUpdate({  _id: addressId, userId }, formData, { new : true});

    if(!address) return handleResponse({ res, status: 404, message: "Address not found for this Id", success: false});

    return handleResponse({ res, status: 201, data: address, success: true, message: "Address Edited"});

  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
}






/*
    1. @desc : get all Addresses
    2. @route POST : api/shop/address/get/:userId
    3. @access public
*/
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if(!userId) return handleResponse({ res, status: 400, message: "UserId is missing", success: false});

    const addressList = await Address.find({ userId });

    return handleResponse({ res, status: 200, data: addressList, success: true });

  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
}







/*
    1. @desc : Delete Address
    2. @route DELETE : api/shop/address/delete/:userId/:addressId
    3. @access public
*/
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if(!userId || !addressId) return handleResponse({ res, status: 400, message: "userId and addressId not present", success: false});

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if(!address) return handleResponse({ res, status: 404, message: 'Address not found', success: false});

    return handleResponse({ res, status: 200, success: true, data: address })

  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
}



module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress } 