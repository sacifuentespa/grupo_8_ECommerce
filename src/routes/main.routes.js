const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const usersController = require("../controllers/userController");

//home
router.get("/", mainController.getIndex);
router.post("/is-email-avaible", usersController.isEmailAvaible);


module.exports = router;
