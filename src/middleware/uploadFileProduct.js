const multer = require('multer')
const path = require('path')
const productsController = require("../model/products.js");
 

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname,'../public/img/imgProducts'))
    },
    filename: function(req, file, cb){
        cb(null, `img${productsController.id}_${path.basename(file.originalname)}`)
    }
})

const uploadFile = multer({storage})
const cpUpload = uploadFile.fields([{ name: 'mainImageUpload', maxCount: 1 }, { name: 'imagesUpload', maxCount: 8 }])

module.exports = cpUpload;