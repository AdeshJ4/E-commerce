const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


//registerUser
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    let userAvailable = await User.findOne({email});
    if(userAvailable) return res.status(400).json({success: false, message: 'User Already available'});

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
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


//logout


//auth modular
module.exports = {registerUser}