var express = require("express");
var router = express.Router();

var exportController = require("../controller/exportController");

router.get("/export/books",exportController.exportBoooks);

module.exports = router;
