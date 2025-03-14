const express = require('express')
const router = express.Router()
const {getItembyID,getAllItem,Lostitem,foundItem,updateItem}=require('../controller/ItemController.js')
const upload=require('../middleware/upload.js')
const authMiddleware=require('../middleware/Authmiddleware.js')

router.get('/',getAllItem)
router.get('/:id',getItembyID)

router.post('/lostitem', authMiddleware,upload.single('imagePath'),Lostitem)
router.post('/founditem',authMiddleware, upload.single('imagePath'),foundItem)

router.put('/updateLostItemDetails/:id',upload.single('imagePath'),authMiddleware,updateItem)


module.exports = router