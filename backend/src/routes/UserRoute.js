const express = require('express')
const router = express.Router()
const {getAllUsers, getUserbyID,register,login,updateUserDetails,updateUserPassword}=require('../controller/UserController.js')
const authMiddleware=require('../middleware/Authmiddleware.js')

router.get('/',getAllUsers)
router.get('/:id',getUserbyID)

router.post('/signup',register)
router.post('/signin',login)

router.put('/userdetails/:id',authMiddleware,updateUserDetails)
router.put('/userPassword/:id', authMiddleware, updateUserPassword) //both these routes require authentication using authMiddleware

module.exports = router