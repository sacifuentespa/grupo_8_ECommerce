const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");
const usersController = require("../controllers/userController");
const adminController = require("../controllers/adminController")
const cpUploadProduct = require("../middleware/uploadFileProduct")
const validations = require("../middleware/validationUpload")
const validationsEdit = require("../middleware/validationEdit")
const cpUploadUser = require("../middleware/uploadFileUser");
const validationRegister = require("../middleware/validationRegister")


//home
router.get("/", mainController.getIndex);

//productPage
router.get("/product/:id", productsController.getProduct);


//productPageUpload
router.get("/productUpload", productsController.getNewProduct);
router.post("/productUpload", cpUploadProduct, validations, productsController.uploadNewProduct);

//productEdition
router.get("/productEdit/:id", productsController.getUpdateProduct);
router.put("/productEdit", cpUploadProduct, validationsEdit, productsController.uploadUpdateProduct);


//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", usersController.getLogin);
router.post("/login", usersController.comprobationLogin)

//register
router.get("/register", usersController.getRegister);
router.post("/register", cpUploadUser, validationRegister, usersController.uploadNewUser);

//list all products
router.get("/listProducts", productsController.getProducts)

//logout
router.get("/logout", usersController.logOut)
router.post("/logout", usersController.logOut)

//admin
router.get("/admin/products/:password", adminController.getAllProducts)
router.get("/admin/users/:password", adminController.getAllUsers)
router.delete("/deleteProduct/:id", productsController.deleteProduct)

module.exports = router;
