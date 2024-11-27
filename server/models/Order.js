const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [{
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity: Number
    }],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String 
}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;






/*

Your schema looks functional for a basic e-commerce application, but there are several areas where it can be optimized for better performance, scalability, and clarity. Here's a review and suggestions for improvements:

---

### **Issues and Improvements**:

1. **Data Types**:
   - Replace `String` with `mongoose.Schema.Types.ObjectId` for references like `userId`, `cartId`, and `addressId` to maintain proper relationships with other collections.
   - Use `Number` for `price` instead of `String` to enable mathematical operations like totals or discounts.

2. **Address Structure**:
   - `addressInfo` could be normalized into a separate collection if you anticipate multiple orders from the same address. However, keeping it embedded is fine if addresses are order-specific.

3. **Order Status**:
   - Use an **enumeration** for `orderStatus` to ensure valid and predictable values (e.g., "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled").
   - Similarly, define enumerations for `paymentStatus` and `paymentMethod`.

4. **Redundancy**:
   - You have both `cartId` and `cartItems`. If `cartId` points to a cart collection, you might not need to embed `cartItems` unless you want a snapshot of the cart at the time of order placement.

5. **Timestamps**:
   - The `{ timestamps: true }` option already includes `createdAt` and `updatedAt`. You may not need `orderDate` and `orderUpdateDate` unless they serve a specific purpose.

6. **Flexibility for Future Features**:
   - Consider adding

*/