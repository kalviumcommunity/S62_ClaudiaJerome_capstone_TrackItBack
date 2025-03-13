const Item=require('../Models/ItemModel.js')

const getAllItem=async(req,res)=>{
    try{
        const item=await Item.find();
        return res.status(200).send(item)
    }catch(err){
        return res.status(500).send({ Error: err.message })
        
    }
}

const getItembyID=async(req,res)=>{
    try{


        const {id} = req.params


        const item = await Item.findById(id)
        if (!item) {
            return res.status(404).send({message: 'Item not found'})
        }

        return res.status(200).send(item)
        
    }catch(err){
        return res.status(500).send({ Error: err.message })
        
    }
    
}

const Lostitem=async(req,res)=>{
    try{
        const{ name, description, location, status}=req.body
        if (!req.file) {
            return res.status(400).send({ message: 'Image upload failed' });
        }
        const imageUrl=req.file.path
        if(!name || !description || !location || !status || !imageUrl){
            return res.status(400).send({message:'All the fields are required'})
        }
        const checkifitemAlreadyExists=await Item.findOne({name})
        if(checkifitemAlreadyExists){
            return res.status(400).send({message:'Item already registered'})
        }
        const item=await Item.create({name,description,location,status,imagePath:imageUrl,userId:req.user._id})
        res.status(201).send({message:'Lost item reported successfully',item})
        
    }catch(err){
        return res.status(500).send({ Error: err.message })
        
    }
}

const foundItem=async(req,res)=>{
    try{
        const {name,description,location}=req.body
        if (!req.file) {
            return res.status(400).send({ message: 'Image upload failed' });
        }
        const imageUrl=req.file.path
        if(!name || !description || !location || !imageUrl){
            return res.status(400).send({message:'All the fields are required'})
        }
        const checkifitemAlreadyExists = await Item.findOne({ name })
        if (checkifitemAlreadyExists) {
            return res.status(400).send({ message: 'Item already registered' })
        }
        const item=await Item.create({name,description,location,status:'found',imagePath:imageUrl,userId:req.user._id})
        return res.status(201).json({message:'Found Item reported successfully',item})
        
    }catch(err){
        return res.status(500).send({ Error: err.message })

    }
}

module.exports={getAllItem,getItembyID,Lostitem,foundItem}