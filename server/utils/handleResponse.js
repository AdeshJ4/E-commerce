const handleResponse  = ({ res, status, message, success, data }) => {
    console.log('message', message);
    
    return res.status(status).json({  success, message, data })
  }
  
  module.exports = handleResponse;