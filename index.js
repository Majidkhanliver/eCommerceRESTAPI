const express = require('express');
const app =express();
require('dotenv').config()
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
app.use('/auth/',authRoute)
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connection Success !!"))
.catch((err)=> console.log(err))
app.listen((process.env.port  || 5000),(err)=>{
    if(err) throw err;
    console.log("Listening at port 5000")
})