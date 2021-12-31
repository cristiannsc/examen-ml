const CONSTANTS = require('../Helpers/constant')

module.exports = class DatabaseException extends Error {

    constructor(message, status, code){
        super();
        this.message = message;
        this.status = status;
        this.code = code || CONSTANTS.ERROR_CODES.DATABASE.DEFAULT
    }

}