const BaseError = require("./baseError");

class APIERROR extends BaseError {
    constructor(name, httpStatusCode, description, isOpertional) {
        super(name, httpStatusCode, description, isOpertional)
    }
}
module.exports = APIERROR