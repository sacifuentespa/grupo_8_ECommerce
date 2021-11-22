const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController.js");

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname,'../public/img/imgProducts'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const uploadFile = multer({storage})

const cpUpload = uploadFile.fields([{ name: 'mainImageUpload', maxCount: 1 }, { name: 'imagesUpload', maxCount: 8 }])

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product", productsController.getProduct);

//productPageUpload
router.get("/productUpload", productsController.getNewProduct);
router.post("/productUpload", cpUpload,productsController.storeNewProduct);

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", mainController.getLogin);

//register
router.get("/register", mainController.getRegister);

//list all products
//router.get("/listProducts", productsController.getProducts)

module.exports = router;
