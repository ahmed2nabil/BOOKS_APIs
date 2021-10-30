var util = require("../util/utility");
var validation = require("../util/validation");
var Logger = require("../services/loggerService");
require('dotenv').config();
const logger = new Logger("uploadController");

const multer  = require('multer');


exports.uploadFile = async (req, res, next) => {
    try {
        const upload = multer({ dest: process.env.UPLOAD_PATH}).single('photo');
        upload(req, res, next => {
            try {
                var path = req.file.path;
                var file = req.file;
                console.log("PATH: " + path);
                console.log("file: " + JSON.stringify(file));
                //save file in directory 
                //save meta dat in database [filename(rename) , size , mimiType, path]; 
                return res.status(200).send({data : "File is uploaded Successfully"});
            } catch (err) {
                throw err;
            }
        });
    }
    catch(e) {
         console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to upload file'})
    }
 }
