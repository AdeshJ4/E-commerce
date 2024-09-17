const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });


userSchema.methods.generateToken = function(){
    const token = jwt.sign(
      {
        id: this._id,
        userName: this.userName,
        email: this.email,
        role: this.role,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "2 days" }
    );

    return token;
}


const User = mongoose.model('User', userSchema)

module.exports = User;