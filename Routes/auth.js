const router =require('express').Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        res.status(500).json(err)
    }
})
router.post('/login',async(req,res)=>{
    try{
        let obj =await User.findOne({username:req.query.username});
        !obj &&  res.status(401).json('Wrong email');
        console.log(obj)
        if(bcrypt.compareSync(req.query.password,obj.password))
        {
            const accessToken = jwt.sign({id:obj._id,isAdmin:obj.isAdmin},process.env.JWT_SEC,
                {expiresIn:"3d"});
                return res.status(200).send(accessToken);
        }
        else{
            return res.status(501).json("Invalid Password")
        }
    }catch(err)
    {
        console.log(err);
        res.send(err);
    }
})
module.exports= router;