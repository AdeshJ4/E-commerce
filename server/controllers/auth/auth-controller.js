const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
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
                    id: userAvailable._id
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


//auth middleware
const authMiddleware = async (req, res, next) =>  {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: 'Unauthorised user'
    })

    try {
        const decoded  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorised user'
        })
    }
}



module.exports = {registerUser, loginUser, logoutUser, authMiddleware }