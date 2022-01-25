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
const comprobationLogged = require("../middleware/comprobationLogged")
const comprobationGuest = require("../middleware/comprobationGuest")


//home
router.get("/", mainController.getIndex);
router.post("/search", productsController.search)

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
router.get("/login", comprobationLogged, usersController.getLogin);
router.post("/login", usersController.comprobationLogin)

//register
router.get("/register", comprobationLogged, usersController.getRegister);
router.post("/register", cpUploadUser, validationRegister, usersController.uploadNewUser);

//profile
router.get("/users/userProfile", comprobationGuest,  usersController.getProfile)

//userEdition
router.get("/users/userEdit", usersController.getUpdateUser);
router.put("/users/userEdit", cpUploadUser, validationRegister, usersController.updateUser);


//list all products
router.get("/listProducts", productsController.getProducts)

//logout
router.get("/logout", usersController.logOut)
router.post("/logout", usersController.logOut)

//admin
router.get("/admin/products/:password", adminController.getAllProducts)
router.get("/admin/users/:password", adminController.getAllUsers)
router.delete("/deleteProduct/:id", productsController.deleteProduct)
router.delete("/deleteUser/:id", usersController.delete)


module.exports = router;
