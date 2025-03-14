const mongoose=require('mongoose')

const ClaimSchema=new mongoose.Schema({
    itemId:{ //this is refering to the Item model
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:["pending","verified","rejected"]
    }
})

const Claim=mongoose.model("Claim",ClaimSchema)
module.exports=Claim