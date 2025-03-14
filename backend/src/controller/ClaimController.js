const Claim=require('../Models/ClaimModel.js')
const Item=require('../Models/ItemModel.js')

const getAllClaims=async(req,res)=>{
    try{
        const claims=await Claim.find().populate("itemId").populate("userId");
        return res.status(200).send(claims)

    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
}

const getClaimbyID=async(req,res)=>{
    try{
        const {id}=req.params
        const claim=await Claim.findById(id).populate("itemId").populate("userId");

        if(!claim){
            return res.status(404).send({message:'claim not found'})
        }
        return res.status(200).send(claim)
    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
}

const createClaim=async(req,res)=>{
    try{
        const {itemId}=req.body
        const {status}=req.body
        if(!itemId){
            return res.status(400).send({message:'Item Id is required'})
        }

        const checkifClaimexists=await Claim.findOne({itemId,userId:req.user._id})
        if(checkifClaimexists){
            return res.status(400).send({message:'You have already submitted a claim for this item'})
        }

        const claim=await Claim.create({itemId,userId:req.user._id,status:status||'pending'})
        return res.status(201).send({message:'Claim request submitted successfully',claim})
        
    }catch(err){
        return res.status(500).send({ Error: err.message })
    }
}

const updateClaimStatus = async (req, res) => {
    try {
        const { claimId } = req.params
        const { status } = req.body



        if (!['verified', 'rejected'].includes(status)) {
            return res.status(400).send({ message: 'Invalid status' })
        }

        const claim = await Claim.findById(claimId);
        // console.log(claim)
        if (!claim) {
            return res.status(404).send({ message: 'Claim is not found' })
        }
        claim.status = status
        await claim.save()
        return res.status(200).send({ message: `claim ${status} successfully`, claim })

    } catch (err) {
        return res.status(500).send({ Error: err.message })

    }
}



module.exports={getAllClaims,getClaimbyID,createClaim,updateClaimStatus}