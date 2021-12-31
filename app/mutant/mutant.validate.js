const logger = require('../../config/logger');
const InputException = require('../Exceptions/InputException')

checkBody(body){

    if (body.length < 4)
        throw new InputException('La cantidad de filas es menor de la cantidad necesaria', 400, body.length, 'E_BODY_LENGTH')
    else if (!(body.every(row => row.length >= 4)))
        throw new InputException('El largo de filas es menor de la cantidad necesaria', 400,)


    body.every((row, index, arr) => row.length === arr[0].length)
}

const ValidateBody = (req, res, next) => {
    
};

module.exports = { ValidateBody };
