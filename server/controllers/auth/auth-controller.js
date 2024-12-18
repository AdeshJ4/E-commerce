const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const handleResponse = require('../../utils/handleResponse');
require('dotenv').config();

//registerUser
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    
    try {
        let userAvailable = await User.findOne({email});
        if(userAvailable) return res.json({success: false, message: 'Email already taken, use another one'});
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            userName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({ success: true, message: 'Registration successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// login
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const  userAvailable = await User.findOne({ email });

        if(userAvailable && (await bcrypt.compare(password, userAvailable.password))){
            const token =  userAvailable.generateToken();            
            return res.cookie('token', token, {httpOnly: true, secure: false}).json({
                success: true,
                message: 'Logged In Successfully',
                user: {
                    email: userAvailable.email,
                    role: userAvailable.role,
                    id: userAvailable._id,
                    userName: userAvailable.userName
                }
            })
        }else{
            return res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }
    }catch (err){
        return res.status(500).json({ success: false, message: err.message})
    }
}

//logoutUser
const logoutUser = (req, res)=> {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully'
    })
}

// check Auth
const checkAuth = (req, res) => {
    const user = req.user;
    return handleResponse({res, status: 200, success: true, message: 'Authenticated user!', data: user})
}


module.exports = {registerUser, loginUser, logoutUser, checkAuth }