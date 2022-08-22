const express = require('express');
const app =express();
require('dotenv').config()
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product')
app.use('/auth/',authRoute)
app.use('/product',productRoute)
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connection Success !!"))
.catch((err)=> console.log(err))
app.listen((process.env.port  || 5000),(err)=>{
    if(err) throw err;
    console.log("Listening at port 5000")
})