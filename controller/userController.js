var queries = require("../db/queries");
var dbConnection = require("../db/connections");
var util = require("../util/utility");
var validation = require("../util/validation");
var Logger = require("../services/loggerService");
var auditService = require("../audit/auditService");
var {auditAction} = require("../audit/auditAction");

var APIERROR = require("../error/apiError");
var errorStatus = require("../error/errorStatus");
var errorType = require("../error/errorType");

const logger = new Logger("userController");

const bcrypt = require("bcryptjs");

exports.getUserList = async (req, res) => {
   let auditOn = util.dateFormat();
    try {
        var userListQuery = queries.queryList.GET_USER_LIST_QUERY;
       var result = await dbConnection.dbQuery(userListQuery);
       
       logger.info("return User List ", JSON.stringify(result.rows));
       auditService.prepareAudit(auditAction.GET_USER_LIST, JSON.stringify(result.rows), null,"postman", auditOn); 
       
       return res.status(200).send(JSON.stringify(result.rows));
    }
    catch(e) {
        console.log("Error: ", e);
        let errorMessage = "Failed to list user: " + e;
        auditService.prepareAudit(auditAction.GET_USER_LIST, null, JSON.stringify(errorMessage),"postman", auditOn); 
        return res.status(500).send({error : 'Failed to list users'})
    }
}

exports.saveUser = async (req,res) => {
    try {
        var createdOn = new Date();
        var createdBy = 'admin';
        //body 
        var username= req.body.username;
        var password= req.body.password;
        var email = req.body.email;
        var userTypeCode  = req.body.userTypeCode;
        //list group added to user 
        var groups  = req.body.groups;

        if(!username || !password || !email || !userTypeCode || !groups) {
            return res.status(500).send({error : "username, password, email, groups and userTypeCode are required, can not be empty"});
        }
        /* 
                Validation
        1- username or email not exists
        2- is email
        3- validate password strength
        */
        var isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
        var user = await dbConnection.dbQuery(isUserExistsQuery,[username, email]);
     
        if(user.rows[0].count != '0') {
        return res.status(500).send({error : "User already exists"});
        }
        if(validation.isValidEmail(email)) {
        return res.status(500).send({error : "Email is not Valid"});
       }
       if(validation.isValidPassword(password)) {
        return res.status(500).send({error : "Email is not Valid"});
       }
       //hash password 

      var  hashedPassword = bcrypt.hash(password,12);
        values = [username, hashedPassword, email, userTypeCode, createdOn, createdBy];
        var saveUSERQuery = queries.queryList.SAVE_USER_QUERY;
        var result = await dbConnection.dbQuery(saveUserQuery,values);
        return res.status(201).send("Added User Successfully") ;       
    } catch (err) {
        console.log("Error: ", err);
        if(err.name === errorType.API_ERROR)
        // send e-mail 
        
        return res.status(500).send({error : 'Failed to create user'})
    }

}

