const asyncHandler= require('express-async-handler');
const jwt=require('jsonwebtoken');

const tokenHandler= asyncHandler(async(req, res, next)=>
{
 let token;
 let authHeader=req.headers.authorization || req.headers.Authorization;
 if(authHeader && authHeader.startsWith('Bearer')){
    token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,decoded)=>{
        if(err) {
            res.status(401);
            throw new Error("User not authenticated or token is not valid");
        }
        console.log(decoded);
        req.thisUser=decoded.thisUser;
        next();
    });
    if(!token){
        res.status(401);
        throw new Error("token is required");
    }
 }
});

module.exports = tokenHandler;