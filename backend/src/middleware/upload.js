const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('../config/cloudinary.js')

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'trackitback',
        allowed_formats:['jpg','png','jpeg']
    }
})

const upload=multer({storage}).array('images',5)
module.exports=upload


