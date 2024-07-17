const express = require('express');
const db_connect = require('./config/db_config');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();  
const router = require ('./router/user-router.js')
const productRouter = require('./router/product-routes');
const tokenHandler = require("./middleware/tokenHandler");
db_connect();
const mongoose = require('mongoose');

const app = express();

app.use(express.json());



app.use(router);
app.use('/api', productRouter);


app.use(tokenHandler);
app.use(errorHandler);

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
    console.log(`Server listening or running on port ${port}`);
});
