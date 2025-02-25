const Claim=require('../Models/ClaimModel.js')

const getAllClaims=async(req,res)=>{
    try{
        const claims=await Claim.find().populate("itemID").populate("userID");
        return res.status(200).send(claims)

    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
}

const getClaimbyID=async(req,res)=>{
    try{
        const id=req.params
        const claim=await Claim.findById(id).populate("itemId").populate("userID");

        if(!claim){
            return res.status(404).send({message:'claim not found'})
        }
        return res.status(200).send(claim)
    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
}

module.exports={getAllClaims,getClaimbyID}