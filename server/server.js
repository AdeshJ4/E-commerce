const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./startup/dbConnection')();


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
app.use(express.json);


app.get('/', (req, res)=> {
  return res.send('Home Page for E-Commerce Application')
});


const port = process.env.PORT || 5001;
app.listen(port, ()=> {
  console.log(`server is listening on port ${port}`);
})