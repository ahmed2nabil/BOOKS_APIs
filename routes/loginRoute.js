var express = require("express");
var router = express.Router();

var loginController = require("../controller/loginController");
var jwtUtil = require("../util/jwtUtil");

router.post("/login/signIn",loginController.signIn);
router.get("/login/profile/:userId", jwtUtil.verifyToken(["user"]), loginController.getUserProfile);

module.exports = router;
