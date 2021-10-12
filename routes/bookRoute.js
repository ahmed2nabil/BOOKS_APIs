var express = require("express");
var router = express.Router();

var bookController = require("../controller/bookController");

router.get("/books",bookController.getBookList);
router.get("/books/details/:bookId",bookController.getBookDetails);
router.post("/books/save",bookController.saveBook);
router.put("/books/:bookId",bookController.updatesBook);
router.delete("/books/:bookId",bookController.deleteBook);


module.exports = router;