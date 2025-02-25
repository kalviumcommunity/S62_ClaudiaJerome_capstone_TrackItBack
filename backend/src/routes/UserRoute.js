const express = require('express')
const router = express.Router()
const {getAllUsers,getAllUsers, getUserbyID}=require('../controller/UserController.js')

router.get('/',getAllUsers)
router.get('/:id',getUserbyID)

module.exports = router