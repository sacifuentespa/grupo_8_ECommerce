const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product/:id", productsController.getProduct);

//productPageUpload
router.get("/productUpload", mainController.getNewProduct);
router.post("/productUpload", productsController.submitProduct)

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", mainController.getLogin);

//register
router.get("/register", mainController.getRegister);

//list all products
router.get("/listProducts", productsController.getProducts)

module.exports = router;
