const express = require('express');
const app =express();
require('dotenv').config()
const mongoose = require('mongoose');
const cartRoute = require('./Routes/cart');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product');
const order = require('./Routes/order');
app.use('/auth/',authRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/order',order)
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connection Success !!"))
.catch((err)=> console.log(err))
app.listen((process.env.port  || 5000),(err)=>{
    if(err) throw err;
    console.log("Listening at port "+process.env.port)
})
