const mongoose = require('mongoose')
const product = require('./product')
const User = require('./User')
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
        ref:User,
         required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId,
                ref:product,
                required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Pending" }
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)