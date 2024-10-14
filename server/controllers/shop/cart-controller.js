const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User");
const handleResponse = require("../../utils/handleResponse");

/*
    1. @desc : Add Products to cart
    2. @route POST : /api/shop/cart/add
    3. @access public
*/
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0)
      return handleResponse({
        res,
        status: 400,
        success: false,
        message: "Invalid data provided",
      });

    //  check user & product exists in DB or not
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return handleResponse({
        res,
        status: 404,
        success: false,
        message: !user
          ? `The user with the given id ${userId} was not found`
          : `The product with the given id ${productId} was not found`,
      });
    }

    // check user have cart or not
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      totalStock: item.productId ? item.productId.totalStock : null,
      quantity: item.quantity,
    }));

    return handleResponse({
      res,
      status: 201,
      data: { ...cart._doc, items: populateCartItems },
      message: "Added to cart",
      success: true,
    });
  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
};


/*
    1. @desc : fetch Cart Products
    2. @route GET : /api/shop/cart/get/:userId
    3. @access public
*/
const fetchCartItems = async (req, res) => {
  try {
    // check client send userId or not
    const { userId } = req.params;

    if (!userId)
      return handleResponse({
        res,
        status: 400,
        message: `userId is mandatory`,
        success: false,
      });

    // check user exists in DB or not
    const user = await User.findById(userId);
    
    if (!user) {
      return handleResponse({
        res,
        status: 404,
        success: false,
        message: `User with id ${userId} not found`,
      });
    }

    // populate product and send to client.
    // we don't want to send just productId, we will send whole product
    // suppose inside cart we have 4 products and admin deleted two products then when you populate cart then it gives null to that 2 deleted products
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });




    if (!cart || cart.items.length === 0)
      return handleResponse({
        res,
        status: 404,
        message: "Empty Cart",
        success: false,
      });

    // After fetching the cart, the route checks if all the products in the cart are still available.
    // This is particularly important if a product has been deleted by the admin but still exists in the user's cart.
    // This filters the cart's items to only include those where productId is not null.
    // If a product has been deleted from the Product collection, the productId would be null in the cart.
    const validItems = cart.items.filter((product) => product.productId);

    

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      totalStock: item.productId.totalStock,
      quantity: item.quantity
    }));    

    return handleResponse({
      res,
      status: 200,
      data: { ...cart._doc, items: populateCartItems },
      success: true,
      message: "Cart fetch successfully",
    });
  } catch (err) {
    return handleResponse({ res, status: 500, message: err.message, success: false });
  }
};


/*
    1. @desc : update Cart Products Qty
    2. @route GET : /api/shop/cart/update-cart
    3. @access public
*/
const updateCartItemsQty = async (req, res) => {
  try {
    //check client send necessary data
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity < 0)
      return handleResponse({
        res,
        status: 400,
        success: false,
        message: "Invalid data provided",
      });

    //  check user & product exists in DB or not
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return handleResponse({
        res,
        status: 404,
        success: false,
        message: !user
          ? `The user with the given id ${userId} was not found`
          : `The product with the given id ${productId} was not found`,
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return handleResponse({
        res,
        status: 404,
        message: "Cart Not Found",
        success: false,
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return handleResponse({
        res,
        status: 404,
        message: "Product not present inside Cart",
        success: false,
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;


    console.log('cart.items[findCurrentProductIndex]', cart.items[findCurrentProductIndex]);

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      totalStock: item.productId ? item.productId.totalStock : null,
      quantity: item.quantity,
    }));

    return handleResponse({
      res,
      status: 200,
      data: { ...cart._doc, items: populateCartItems },
      success: true,
      message: "Item Updated",
    });
  } catch (err) {
    handleResponse({ res, status: 500, message: err.message, success: false });
  }
};


/*
    1. @desc : delete Cart Products
    2. @route GET : /api/shop/cart/:userId/:productId
    3. @access public
*/
const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;    
    if (!userId || !productId)
      return handleResponse({
        res,
        status: 404,
        message: "Invalid Data provided",
        success: false,
      });

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return handleResponse({
        res,
        status: 404,
        success: false,
        message: !user
          ? `The user with the given id ${userId} was not found`
          : `The product with the given id ${productId} was not found`,
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    if (!cart)
      return handleResponse({
        res,
        success: false,
        message: "Cart not found",
        status: 404,
      });

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      totalStock: item.productId ? item.productId.totalStock : null,
      quantity: item.quantity,
    }));

    return handleResponse({
      res,
      status: 200,
      data: { ...cart._doc, items: populateCartItems },
      success: true,
      message: "Items removed from Cart",
    });
  } catch (err) {
    handleResponse({ res, status: 500, message: err.message, success: false });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemsQty,
  deleteCartItems,
};
