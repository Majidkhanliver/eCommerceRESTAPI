const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true,
            unique:true
        },
        img:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true
        },
        Categories:{
            type:Array
        },
        size:String,
        color:String,
        price:{type:Number, required:true}
    },{timestamps:true}
);
module.exports=mongoose.model('product',productSchema)