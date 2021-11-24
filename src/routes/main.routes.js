const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");
const usersController = require("../controllers/userController");
const cpUploadProduct = require("../middleware/uploadFileProduct")

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product/:id", productsController.getProduct);

//productPageUpload
router.get("/productUpload", productsController.getNewProduct);
router.post("/productUpload", cpUploadProduct,productsController.uploadNewProduct);

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", usersController.getLogin);

//register
router.get("/register", usersController.getRegister);
router.post("/register", usersController.uploadNewUser);

//list all products
//router.get("/listProducts", productsController.getProducts)

module.exports = router;
