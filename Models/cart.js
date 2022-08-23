const mongoose = require('mongoose');
const User = require('../Models/User')
const product = require('../Models/product')
const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    products:[{
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:product,
        required:true
    },
    quantity:{
        type:Number,
        default:1,
    }
    }]
})
module.exports = mongoose.model('cart',cartSchema);