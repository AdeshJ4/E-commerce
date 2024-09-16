const express = require('express');
const app = express();
require('dotenv').config();

require('./startup/dbConnection')();
require('./startup/routes')(express, app);


app.get('/', (req, res)=> {
  return res.send('Home Page for E-Commerce Application')
});


const port = process.env.PORT || 5001;
app.listen(port, ()=> {
  console.log(`server is listening on port ${port}`);
})