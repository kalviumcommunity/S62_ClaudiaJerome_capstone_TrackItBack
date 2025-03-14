const express=require('express')
const router=express.Router()
const {getAllClaims,getClaimbyID,createClaim,updateClaimStatus}=require('../controller/ClaimController.js')
const authMiddleware=require('../middleware/Authmiddleware.js')
const { isItemowner }=require('../middleware/isItemOwner.js')


router.get('/',getAllClaims)
router.get('/:id',getClaimbyID)

router.post('/claimitem',authMiddleware,createClaim)

router.put('/updateclaim/:claimId', authMiddleware, isItemowner, updateClaimStatus)

module.exports=router 