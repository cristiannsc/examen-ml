module.exports = class InputException extends Error {

    constructor(message, status, summary, code){
        super();
        this.summary = summary;
        this.message = message;
        this.status = status;
        this.code = code || 'E_INPUT'
    }

}