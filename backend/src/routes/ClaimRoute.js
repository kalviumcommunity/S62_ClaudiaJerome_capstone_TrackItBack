const express=require('express')
const router=express.Router()
const {getAllClaims,getClaimbyID}=require('../controller/ClaimController.js')

router.get('/',getAllClaims)
router.get('/:id',getClaimbyID)


module.exports=router