const express = require('express')
const router = express.Router()
const {getAllUsers, getUserbyID,register,login}=require('../controller/UserController.js')
const authMiddleware=require('../middleware/Authmiddleware.js')

router.get('/',getAllUsers)
router.get('/:id',getUserbyID)

router.post('/signup',register)
router.post('/signin',login)

module.exports = router