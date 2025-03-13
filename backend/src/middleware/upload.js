// const multer=require('multer')
// const {CloudinaryStorage}=require('multer-storage-cloudinary')
// const cloudinary=require('../config/cloudinary.js')

// const storage=new CloudinaryStorage({
//     cloudinary:cloudinary,
//     params:{
//         folder:'trackitback',
//         allowed_formats:['jpg','png','jpeg']
//     }
// })

// const upload=multer({storage})
// module.exports=upload


const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/uploads'));
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    },
});

const upload = multer({ storage: storage });

module.exports = upload;