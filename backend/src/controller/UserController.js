const User=require('../Models/UserModel.js');
require('dotenv').config({path:'./src/config/.env'})
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


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

const register=async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body
        if(!name || !email || !password || !phone){
            return res.status(400).sned({message:'All the fields are required'})
        }

        const checkifUserExists=await User.findOne({email})
        if(checkifUserExists){
            return res.status(400).send({message:'User already exists'})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedPassword,phone})
        return res.status(201).send({message:'User registered successfully',user:{id:user._id,name,email,phone}})
        
    }catch(err){
        return res.status(500).send({ Error: err.message })
        
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).send({message:'All the fields are required'})
        }
        const user=await User.findOne({email})
        const isMatch=await bcrypt.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(401).send({message:'Invalid credentails'})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
        res.cookie('token',token,{httpOnly:true,secure:true})
        return res.status(201).send({message:'User logged in successfully',user:{id:user._id,email}})
    }catch(err){
        return res.status(500).send({ Error: err.message })

    }
}


module.exports={getAllUsers,getUserbyID,register,login}