var express = require("express");
var router = express.Router();

var uploadController = require("../controller/uploadController");

router.post("/upload/file",uploadController.uploadFile);

module.exports = router;
