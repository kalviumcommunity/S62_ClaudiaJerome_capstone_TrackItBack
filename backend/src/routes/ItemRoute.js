const express = require('express')
const router = express.Router()
const {getItembyID,getAllItem}=require('../controller/ItemController.js')

router.get('/',getAllItem)
router.get('/:id',getItembyID)

module.exports = router