const router =require('express').Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')
router.post('/register',async(req,res,next)=>{
    console.log(req.query)
    let hashedPassword = bcrypt.hashSync(req.query.password,10)
    const newUser = new User({
        username: req.query.username,
        email:req.query.email,
        password: hashedPassword
    })
    try{
        let savedUser = await newUser.save();
        res.status(200).send(savedUser)
    }catch(err)
    {
        res.status(500).err(err)
    }
})
module.exports= router;