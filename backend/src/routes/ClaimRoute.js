const express=require('express')
const router=express.Router()
const {getAllClaims,getClaimbyID,createClaim}=require('../controller/ClaimController.js')
const authMiddleware=require('../middleware/Authmiddleware.js')


router.get('/',getAllClaims)
router.get('/:id',getClaimbyID)

router.post('/claimitem',authMiddleware,createClaim)


module.exports=router 