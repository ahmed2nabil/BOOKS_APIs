const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");
dotenv.config();
exports.generateToken = (userId, username, email, userRoles, userTypeCode) => { 
    let token =jwt.sign({
        userId : userId,
        username: username,
        email : email,
        userTypeCode : userTypeCode,
        userRoles : userRoles
    }, 
    process.env.SECRET, {
        expiresIn:'3d'
    })
    return token;
}

exports.verifyToken = function(roles){
    return async (req, res, next) => {
        try {
            const {token} = req.headers ;
            if(!token) {
                console.log("No Token exist"); 
                return res.status(500).send({error : "No Token exist"})
            }
            //validate if LoggedIn user has the same role 
             let decodedToken = await jwt.verify(token, process.env.SECRET);
             console.log("decodeToken: " , decodedToken);
             req.user = {
                 userId : decodedToken.userId,
                 username: decodedToken.username,
                 email : decodedToken.email,
                 userTypeCode : decodedToken.userTypeCode,
                 userRoles : decodedToken.userRoles
             }
             if(!this.hasRole(roles, decodedToken.userRoles)){
                console.log("Error : not have the same role"); 
                return res.status(401).send({error : "Authentication failed"})       
             }
             console.log("valid token");
             next();
        }
         catch (err) {
            next(err);
        }
    }
}

exports.hasRole = function(routeRoles, userRoles) {
    console.log("routeRoles : " + routeRoles.includes("user"))
    let result = false;
    userRoles.forEach(role => {
        if(routeRoles.includes(role)) {
            result = true;
            return;
        }
    });
    return result;
}