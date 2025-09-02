const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary.js')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'trackitback',
        format: async (req, file) => 'jpeg'
    }
})

const upload = multer({ storage })
module.exports = upload


