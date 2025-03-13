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

module.exports={getAllItem,getItembyID}