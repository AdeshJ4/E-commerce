const mongoose = require('mongoose');
const handleResponse = require('./handleResponse');

const validateObjectId = ( req, res, next ) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return  handleResponse({res, status: 400, message: 'Invalid ObjectId', success: false})
  }

  next();
}


module.exports = validateObjectId;