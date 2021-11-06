const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

//home
router.get("/", controller.getIndex);

//productPage
router.get("/product", controller.getProduct);

//productPageUpload
router.get("productPage", controller.getNewProduct);

//cart
router.get("/cart", controller.getCart);

//login
router.get("/login", controller.getLogin);

//register
router.get("/register", controller.getRegister);

module.exports = router;
