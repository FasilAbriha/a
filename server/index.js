const express=require('express')
const db_connect = require('./config/db_config');
const errorHandler = require('./middleware/errorHandler');
const dotenv=require("dotenv").config()
const tokenHandler = require("./middleware/tokenHandler");
const mongoose = require('mongoose');


const app=express()

app.use(express.json());



app.use(errorHandler);
app.use(dotenv);
app.use(tokenHandler);
app.use(db_connect);

const port=process.env.PORT_NUMBER;


app.listen (port,()=> {
    console.log(`Server listing or running on port ${port}`);    
})
