const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
//const productsController = require("../controllers/productsController");

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product/:id", productsController.getProduct);

//productPageUpload
router.get("/productUpload", controller.getNewProduct);
router.post("/productUpload", controller.storeNewProduct);

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", mainController.getLogin);

//register
router.get("/register", mainController.getRegister);

//list all products
router.get("/listProducts", productsController.getProducts)

module.exports = router;
