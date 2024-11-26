const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: String,
  address: String,
  city: String,
  pincode: String,
  phone: String,
  notes: String
}, { timestamps: true});


module.exports = mongoose.model("Address", AddressSchema);




/*

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, 'Please enter a valid phone number'], // Adjust regex for your country
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Optional
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    addressType: {
      type: String,
      enum: ['Shipping', 'Billing'],
      default: 'Shipping',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Address', addressSchema);


*/