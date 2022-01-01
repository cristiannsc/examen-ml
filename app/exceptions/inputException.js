const CONSTANTS = require('../helpers/constant')

module.exports = class InputException extends Error {

    constructor(message, status, summary, code){
        super();
        this.summary = summary;
        this.message = message;
        this.status = status;
        this.code = code || CONSTANTS.ERROR_CODES.INPUT.DEFAULT
    }

}