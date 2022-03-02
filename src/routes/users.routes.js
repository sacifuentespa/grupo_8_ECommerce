const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const usersController = require("../controllers/userController");
const cpUploadUser = require("../middleware/uploadFileUser");
const validationRegister = require("../middleware/validationRegister")
const validationUserEdit = require("../middleware/validationUserEdit")
const comprobationLogged = require("../middleware/comprobationLogged")
const comprobationGuest = require("../middleware/comprobationGuest")
const adminController = require("../controllers/adminController")


// route/users/

//cart
router.get("/cart", mainController.getCart);

//login
router.get("/login", comprobationLogged, usersController.getLogin);
router.post("/login", usersController.comprobationLogin)

//register
router.get("/register", comprobationLogged, usersController.getRegister);
router.post("/register", cpUploadUser, validationRegister, usersController.uploadNewUser);

//profile
router.get("/profile", comprobationGuest,  usersController.getProfile)

//userEdition
router.get("/edit", comprobationGuest, usersController.getUpdateUser);
router.put("/edit", cpUploadUser, validationUserEdit, usersController.updateUser);

//logout
router.get("/logout", usersController.logOut)

//deleteUser
router.delete("/delete/:id", usersController.deleteUser)  

//adminRoute
router.get("/admin/:password", adminController.getAllUsers)

//api to get all users
router.get("/api", usersController.apiUsers)

//api to get one user
router.get("/api/:id", usersController.apiDetailUser)

// view user
router.get("/:id", usersController.getProfile)

module.exports = router;
