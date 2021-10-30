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

const logger = new Logger("loginController");

const bcrypt = require("bcryptjs");
var jwtUtil = require("../util/jwtUtil");


exports.getUserProfile = async (req, res) => {
   var user = req.user;
    try {
       return res.status(200).send(JSON.stringify(user));
    }
    catch(e) {
        console.log("Error: ", e);
        let errorMessage = "Failed to get user: " + e;
  return res.status(500).send({error : 'Failed to get user'})
    }
}



exports.signIn = async (req, res) => {
    try {
        const {username , password} = req.body;
        /*
        1- Validate is not empty 
        2- get user by username 
        3- compare password 
        4- get User roles
        5- generate token
         */
        if(!username || !password) {
            return res.status(500).send({error : "username and password can not be empty"});
        }
        var loginQuery = queries.queryList.LOGIN_QUERY;
        var result = await dbConnection.dbQuery(loginQuery,[username]);
        if(result.rows[0] === null)  {
            logger.info("user [" + username + "] not exists");
            return res.status(errorStatus.unauthorized).send({error : "Invalid Username or Password"});
        }
        let isPasswordValid = validation.comparePassword(password,result.rows[0].password);
        if(!isPasswordValid) {
            logger.info("password is not valid");
            return res.status(errorStatus.unauthorized).send({error : "Invalid Username or Password"});
        }
        var userRoles = await this.getUseRoles(result.rows[0].user_id);
        console.log("userRoles: ", userRoles);
        let dbResponse = result.rows[0];
        let token = jwtUtil.generateToken(dbResponse.user_id,dbResponse.username, dbResponse.email, userRoles, dbResponse.user_type_code);
       return res.status(200).send(JSON.stringify(token));
    } catch (err) {
        logger.error("Falid to Sign In, Invalid Username or Password" + JSON.stringify(err));
       return res.status(500).send({error : "Failed to Sign In Invalid Username or Password"});        
    }
}

exports.getUseRoles = async (userId) => {
    try {
        let roles = ["user", "admin"];
        return roles; 
    } catch (err) {
        
    }
}