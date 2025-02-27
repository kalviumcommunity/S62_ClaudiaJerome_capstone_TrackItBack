const mongoose=require('mongoose')

const ItemSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:{
            type:String,
            enum:["lost","found","claimed"]
        }
    },
    imageUrl:{
        type:String,
        required:true
    }
})

const Item=mongoose.model("Item",ItemSchema)
module.exports=Item