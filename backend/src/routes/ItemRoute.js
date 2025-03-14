const express = require('express')
const router = express.Router()
const {getItembyID,getAllItem,Lostitem,foundItem,updateItem}=require('../controller/ItemController.js')
const upload=require('../middleware/upload.js')
const authMiddleware=require('../middleware/Authmiddleware.js')

router.get('/',getAllItem)
router.get('/:id',getItembyID)

router.post('/lostitem', authMiddleware,upload.single('imagePath'),Lostitem)
router.post('/founditem',authMiddleware, upload.single('imagePath'),foundItem)

router.put('/updateItemDetails/:id', authMiddleware, upload.single('imagePath'),updateItem)


module.exports = router