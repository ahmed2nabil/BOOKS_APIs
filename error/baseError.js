class BaseError extends Error {
    constructor(name, httpStatusCode, description, isOpertional) {
        super(description)
        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.description = description;
        this.isOpertional = isOpertional;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError