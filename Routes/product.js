const { verifyTokenAndAdmin } = require('../Middleware/verifytoken');
const product = require('../Models/product');

const router = require('express').Router();
router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    console.log('request received')
    const newProduct = new product(req.query)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});
router.get('/:id',verifyTokenAndAdmin, async (req,res)=>{
    try{
        let doc = await product.findById(req.params.id);
        res.send(doc)
        }catch(err)
    {
        console.log(err);
        res.send(err)
    }
})
router.delete('/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
        let doc = await product.findByIdAndDelete(req.params.id);
        console.log(doc);
        res.status(200).send(doc)
    }catch(err)
    {
        console.log(err);
        res.status(403).json(err)
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const UpdatedProduct = await product.findByIdAndUpdate(req.params.id,{$set:req.query},{new:true});
        res.status(200).json(UpdatedProduct)
    }catch(err)
    {
        console.log(err);
        res.status(403).json(err)
    }
});
router.post('/find/', verifyTokenAndAdmin,async(req,res)=>{
    let qNew = req.query.new;
    let qCategory = req.query.category;
    let products;
    try{
        if(qNew){
        products=    await  product.find().sort({createdAt:-1}).limit(5)
        }
        else if(qCategory){
            products = await product.find({Categories:{$in:[qCategory]}})
        }
        else{
            products = await product.find();
        }
        res.status(200).send(products)
    }catch(err){
        res.send(err)
    }
})
module.exports = router