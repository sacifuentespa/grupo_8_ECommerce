const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");


//home
router.get("/", mainController.getIndex);


module.exports = router;
