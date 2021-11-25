const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");
const usersController = require("../controllers/userController");
const adminController = require("../controllers/adminController")
const cpUploadProduct = require("../middleware/uploadFileProduct")

//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product/:id", productsController.getProduct);


//productPageUpload
router.get("/productUpload", productsController.getNewProduct);
router.post("/productUpload", cpUploadProduct,productsController.uploadNewProduct);

//productEdition
router.get("/productEdit/:id", productsController.getUpdateProduct);
router.put("/productEdit", cpUploadProduct,productsController.uploadUpdateProduct);


//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", usersController.getLogin);

//register
router.get("/register", usersController.getRegister);
router.post("/register", usersController.uploadNewUser);

//list all products
router.get("/listProducts", productsController.getProducts)

//admin
router.get("/admin/products/:password", adminController.getAllProducts)
router.get("/admin/users/:password", adminController.getAllUsers)
router.delete("/deleteProduct/:id", productsController.deleteProduct)

module.exports = router;
