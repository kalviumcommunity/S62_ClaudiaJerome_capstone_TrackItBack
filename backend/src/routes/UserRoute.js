const express = require('express')
const router = express.Router()
const {getAllUsers, getUserbyID,register,login,updateUserDetails,updateUserPassword}=require('../controller/UserController.js')
const authMiddleware=require('../middleware/Authmiddleware.js')

router.get('/',getAllUsers)
router.get('/:id',getUserbyID)

router.post('/signup',register)
router.post('/signin',login)

router.put('/userdetails/:id',updateUserDetails)
router.put('/userPassword/:id',updateUserPassword)

module.exports = router