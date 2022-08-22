const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
    console.log(req.headers.token)
    const authHeader = req.headers.token;
    console.log(authHeader)
    if(authHeader)
    {
        jwt.verify(authHeader,process.env.JWT_SEC,(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }
            console.log(user)
            req.user=user;
            next();
        })
    }
    else{
        res.status(401).json("Token is needed")
    }
};
const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log(req.user)
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not authorzied");
        }
    })
}

module.exports={verifyToken,verifyTokenAndAdmin}