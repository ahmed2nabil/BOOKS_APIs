var queries = require("../db/queries");
var dbConnection = require("../db/connections");
var util = require("../util/utility");
var validation = require("../util/validation");
var Logger = require("../services/loggerService");
var auditService = require("../audit/auditService");
var {auditAction} = require("../audit/auditAction");

const logger = new Logger("exportController");

const fastCsv = require("fast-csv");
const fs      = require("fs");

const ws = fs.createWriteStream("books.csv");

exports.exportBoooks = async (req, res) => {
    try {
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
        var result = await dbConnection.dbQuery(bookListQuery);
       logger.info("return BOOK List ", JSON.stringify(result.rows));
       const data = JSON.parse(JSON.stringify(result.rows));
       fastCsv.write(data, { headers: true}).on("end", () => {
           console.log("write to books.csv successfully");
           res.download("book.csv", () => {
               console.log("file downloaded succsefully")
           })
       }).pipe(ws);
    //    return res.status(200).send({data : 'export data successfully'})
    }
    catch(e) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to export list books'})
    }
}
