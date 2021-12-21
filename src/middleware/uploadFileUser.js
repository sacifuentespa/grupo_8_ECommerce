const multer = require('multer')
const path = require('path')

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname,'../public/img/imgUsers'))
    },
    filename: function(req, file, cb){
        cb(null, `img${Date.now()}_${path.basename(file.originalname)}`)
    }
})

const uploadFile = multer({storage});
const cpUploadUser = uploadFile.single("avatar");
module.exports = cpUploadUser;