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


module.exports = router;
