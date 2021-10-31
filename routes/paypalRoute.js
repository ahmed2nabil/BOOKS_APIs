var express = require('express');
const router = express.Router();
var paypalController = require('../controller/paypmentController');

router.get("/buy" , paypalController.createPayment);

module.exports = router;