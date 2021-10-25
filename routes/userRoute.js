var express = require("express");
var router = express.Router();

var userController = require("../controller/userController");

router.get("/users",userController.getUserList);
router.post("/users/save",userController.saveUser);


module.exports = router;
