const User=require('../Models/UserModel.js');
require('dotenv').config({path:'./src/config/.env'})


const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-passowrd");
        res.status(200).json(users);
    }catch(err){
        return res.status(500).send({Error:err.message})
    }
}

const getUserbyID=async(req,res)=>{
    try{
        const {id}=req.params

        const user=await User.findById(id).select("-password");

        if(!user){
            return res.status(404).send({message:'user not found'})
        }
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
    
}


module.exports={getAllUsers,getUserbyID}