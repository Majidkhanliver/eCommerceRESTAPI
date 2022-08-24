const order = require('../Models/order');
const {verifyTokenAndAdmin} = require('../Middleware/verifytoken')
const router = require('express').Router();
router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const userId = req.query.userId;
    const productId = req.query.productId;
    const quantity = req.query.quantity;
    const amount = req.query.amount;
    const address  = req.query.address;
    const Status = req.query.status;
    const newOrder = new order({
        userId:userId,
        products:{
            productId: productId,
            quantity:quantity,
        },
        amount:amount,
        address:address,
        status:Status
    })
    try{
        let doc = await newOrder.save();
        res.send(doc)
    }catch(err){
        res.status(403).send(err);
    }

    })
    router.get('/:id',verifyTokenAndAdmin,async(req,res)=>{
        try{
            let doc = await order.findById(req.params.id).populate('userId',{'username':1})
            res.send(doc)

        }catch(err)

        {
            res.status(403).send(err)
        }
    })
    router.get('/find',verifyTokenAndAdmin,async(req,res)=>{
        try{
            let doc = await order.find({})
            res.status(201).send(doc)
        }catch(err)
        {
            res.status(403).send(err)
        }
    })
    router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
        try{
            let doc = order.findByIdAndUpdate(req.params.id,{$set:req.query},{new:true});
            console.log(doc)
            res.status(201).json(doc)

        }catch(err)
        {
            console.log(err)
            res.status(403).json(err)
        }
    })
module.exports= router