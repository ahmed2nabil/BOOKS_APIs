var queries = require("../db/queries");
var dbConnection = require("../db/connections");
var util = require("../util/utility");
var Logger = require("../services/loggerService");

const logger = new Logger("bookController");
exports.getBookList = async (req, res) => {
    try {
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
       var result = await dbConnection.dbQuery(bookListQuery);
       logger.info("return BOOK List ", JSON.stringify(result.rows));
        return res.status(200).send(JSON.stringify(result.rows));
    }
    catch(e) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to list book'})
    }
}

exports.getBookDetails = async (req, res) => {
    try {
        var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        var bookId = req.params.bookId;
       var result = await dbConnection.dbQuery(bookDetailsQuery,[bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    }
    catch(e) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to list book'})
    }
}

exports.saveBook = async (req,res) => {
    try {
        var createdOn = new Date();
        var createdBy = 'admin';
        //body 
        var bookTitle= req.body.bookTitle;
        var bookDescription = req.body.bookDescription;
        var bookPublisher  = req.body.bookPublisher;
        var bookAuthor  = req.body.bookAuthor;
        var bookPages = req.body.bookPages;
        var storeCode = req.body.storeCode;
        if(!storeCode || !bookPublisher || !bookTitle || !bookAuthor) {
            return res.status(500).send({error : "store code, title, author and publisher are required"});
        }
        var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
        values = [bookTitle, bookDescription, bookAuthor, bookPublisher, bookPages, storeCode, createdOn, createdBy];
        var result = await dbConnection.dbQuery(saveBookQuery,values);
        return res.status(201).send("Added BOOK Successfully") ;       
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).send({error : 'Failed to create book'})
    }

}


exports.updatesBook = async (req,res) => {
    try {
        var createdOn = new Date();
        var createdBy = 'admin';
        //body 
        var bookId= req.body.bookId;
        var bookTitle= req.body.bookTitle;
        var bookDescription = req.body.bookDescription;
        var bookPublisher  = req.body.bookPublisher;
        var bookAuthor  = req.body.bookAuthor;
        var bookPages = req.body.bookPages;
        var storeCode = req.body.storeCode;
        if(!bookId || !storeCode || !bookPublisher || !bookTitle || !bookAuthor) {
            return res.status(500).send({error : "book ID, store code, title, author and publisher are required"});
        }
        var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        values = [bookTitle, bookDescription, bookAuthor, bookPublisher, bookPages, storeCode, createdOn, createdBy,bookId];
        var result = await dbConnection.dbQuery(updateBookQuery,values);
        return res.status(201).send("Updated BOOK Successfully title: "+ bookTitle) ;       
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).send({error : 'Failed to update book'})
    }

}

exports.deleteBook = async (req, res) => {
    try {
        var deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        var bookId = req.params.bookId;
        if(!bookId) {
            return res.status(500).send({error : "can not delete empty book"})
        }
       var result = await dbConnection.dbQuery(deleteBookQuery,[bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    }
    catch(e) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to delete book'})
    }
}