const express = require('express')
const router = express.Router()
const {getAllUsers, getUserbyID}=require('../controller/UserController.js')

router.get('/',getAllUsers)
router.get('/:id',getUserbyID)



module.exports = router