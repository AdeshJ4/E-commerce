const jwt = require('jsonwebtoken');
const handleResponse = require("../utils/handleResponse");
require('dotenv').config();


async function validateToken(req, res, next) {
    const token = req.cookies.token;

    if(!token) return handleResponse({res, status: 401,success: false, message: 'Unauthorized user. Access denied. No token provided'});

    try{  
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        return handleResponse({res, status: 401, message: 'Invalid token', success: false})
    }


}


module.exports = validateToken