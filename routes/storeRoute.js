var express = require("express");
var router = express.Router();

var storeController = require("../controller/storeControlller");

router.get("/stores",storeController.getStoreList);

router.post("/stores/save",storeController.saveStore);

module.exports = router;