const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database is connected`);
    console.log(`Host: ${connect.connection.host}`);
    console.log(`DB Name: ${connect.connection.name}`);
  } catch (err) {
    console.log(`Database is not Connected`);
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;