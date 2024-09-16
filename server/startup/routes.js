const authRouter = require('../routes/auth/auth-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');


module.exports = function (express, app) {

    app.use(cors({
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    }))

    app.use(cookieParser());
    app.use(express.json());
    app.use(morgan("tiny"));


    app.use("/api/auth", authRouter);
}