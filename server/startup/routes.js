const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('../routes/auth/auth-routes');
const adminProductRouter = require('../routes/admin/products-routes');
const shopProductRouter = require('../routes/shop/products-routes');
const shopCartRouter = require('../routes/shop/cart-routes');
const shopAddressRouter = require('../routes/shop/address-routes');


module.exports = function (express, app) {
    app.use(cors({
        origin: 'http://localhost:5173',
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
    app.use("/api/admin/products", adminProductRouter);
    app.use("/api/shop/products", shopProductRouter);
    app.use("/api/shop/cart", shopCartRouter);
    app.use("/api/shop/address", shopAddressRouter);
}