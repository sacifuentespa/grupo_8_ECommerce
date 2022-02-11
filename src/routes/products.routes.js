const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const cpUploadProduct = require("../middleware/uploadFileProduct")
const validations = require("../middleware/validationUpload")
const validationsEdit = require("../middleware/validationEdit")
const adminController = require("../controllers/adminController")


// route/products/

//list all products
router.get("/", productsController.getProducts)

//productPageUpload
router.get("/upload", productsController.getNewProduct);
router.post("/upload", cpUploadProduct, validations, productsController.uploadNewProduct);

//productPage
router.get("/:id", productsController.getProduct);

//searchProduct
router.post("/search", productsController.search)   



//productEdition
router.get("/edit/:id", productsController.getUpdateProduct);
router.put("/edit", cpUploadProduct, validationsEdit, productsController.uploadUpdateProduct);

//deleteProduct
router.delete("/delete/:id", productsController.deleteProduct)

//adminRoute
router.get("/admin/:password", adminController.getAllProducts)

module.exports = router;
