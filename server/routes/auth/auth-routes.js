const express = require('express');
const { registerUser, loginUser, logoutUser, checkAuth } = require('../../controllers/auth/auth-controller');
const validateToken = require('../../middlewares/validateTokenHandler');


const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/check-auth', validateToken, checkAuth);

module.exports = authRouter;