const jwt=require('jsonwebtoken')
const User = require('../Models/UserModel.js')
require('dotenv').config({ path: './src/config/.env' })

const authMiddleware=async(req,res,next)=>{
    try{
        
        const token=req.cookies.token
        if(!token){
            return res.status(401).send({message:'Unauthorized'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY) //Protects routes by verifying JWT tokens before granting access.
        req.user=await User.findById(decode.id).select('-password')
        if(!req.user){
            return res.status(401).send({message:'User not found'})
        }
        next()

    }catch(err){
        console.error("Auth Error:", err);
        return res.status(500).send({message:'Invalid token'})
    }
}

module.exports=authMiddleware