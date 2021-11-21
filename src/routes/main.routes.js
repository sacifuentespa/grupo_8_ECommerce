const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController.js");

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product", productsController.getProduct);

//productPageUpload
router.get("/productUpload", productsController.getNewProduct);
router.post("/productUpload", productsController.storeNewProduct);

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", mainController.getLogin);

//register
router.get("/register", mainController.getRegister);

//list all products
//router.get("/listProducts", productsController.getProducts)

module.exports = router;
