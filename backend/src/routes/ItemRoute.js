const express = require('express')
const router = express.Router()
const { getItembyID, getAllItem, Lostitem, foundItem, updateItem,deleteItemById } = require('../controller/ItemController.js')
const upload = require('../middleware/upload.js')
const authMiddleware = require('../middleware/Authmiddleware.js')

router.get('/', getAllItem)
router.get('/:id', getItembyID)

router.post('/lostitem', authMiddleware, upload.array('images', 5), Lostitem)
router.post('/founditem', authMiddleware, upload.array('images', 5), foundItem)

router.put('/updateItemDetails/:id', authMiddleware, upload.array('images', 5), updateItem)

router.delete('/deleteItem/:id', authMiddleware, deleteItemById)


module.exports = router