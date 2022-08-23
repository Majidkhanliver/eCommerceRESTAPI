const router = require('express').Router();
const { verifyToken } = require('../Middleware/verifytoken');
const cart = require('../Models/cart');

router.post('/',verifyToken,async(req,res)=>{
    console.log('recived')
    const userId = req.query.userId;
    const productID = req.query.productId;
    const quantity = req.query.quantity;
    try{
        const newCart = new cart({
            userId:userId,
            products:{
                productId:productID,
                quantity:quantity
            }
        })
        let doc = await newCart.save();
        console.log(doc)
        res.send(doc)
    }catch(err)
    {
        console.log(err)
        res.send(err);
    }
})
router.get('/:id',verifyToken,async(req,res)=>
{
    try{
        let doc = await cart.findById(req.params.id)
        res.status(201).json(doc)
    }catch(err)
    {
        res.status(403).send(err);
    }
}
)
router.delete('/:id',verifyToken,async(req,res)=>{
    try{
        let doc = await cart.findByIdAndDelete(req.params.id)
        res.status(200).send(doc)
    }catch(err){
        res.status(403).send(err)
    }
})
router.get('/find',verifyToken,async(req,res)=>
{
    try{
        let doc = await cart.find({}).populate("userId")
        res.send(doc)
    }catch(err){
        res.send(err)
    }
})
module.exports = router;