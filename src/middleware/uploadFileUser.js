const multer = require('multer')
const path = require('path')

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname,'../public/img/imgUsers'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const uploadFile = multer({storage})
const cpUpload = uploadFile.fields([{ name: 'mainImageUpload', maxCount: 1 }, { name: 'imagesUpload', maxCount: 8 }])

module.exports = cpUpload;