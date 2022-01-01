const InputException = require('../../Exceptions/inputException')
const CONSTANTS = require('../../Helpers/constant')

checkBody = (body) => {

    /* if (body.length < 4)
        throw new InputException('La cantidad de filas es menor de la cantidad necesaria', 400, { row_length: body.length }, CONSTANTS.ERROR_CODES.INPUT.BODY_LENGTH)
    else if (!(body.every(row => row.length >= 4))) {
        const result = body.filter(row => row.length < 4);
        throw new InputException('El largo de filas es menor de la cantidad necesaria', 400, { col_length: result[0].length }, CONSTANTS.ERROR_CODES.INPUT.COLUMN_LENGTH)
    } */
    if (body.every((row, index, arr) => row.length === arr[0].length)) {
        if (body.length != body[0].length)
            throw new InputException('La matriz debe ser cuadrada', 400, { row_length: body.length, col_length: body[0].length }, CONSTANTS.ERROR_CODES.INPUT.SQUARE_MATRIX)
    } else {
        const resultRows = body.filter((row, index, arr) => row.length === body.length);
        const result = body.filter((row, index, arr) => row.length !== resultRows[0].length);
        throw new InputException('La matriz debe ser cuadrada', 400, { row_length: body.length, col_length: result[0].length }, CONSTANTS.ERROR_CODES.INPUT.SQUARE_MATRIX)
    }
    let nonValidCharacterArray = body.filter(row => CONSTANTS.VALID_CHARACTERS_REGEX.test(row))
    if (nonValidCharacterArray.length > 0)
        throw new InputException('Caracter no valido en la secuencia de ADN', 400, { invalid_rows: nonValidCharacterArray.toString() }, CONSTANTS.ERROR_CODES.INPUT.NON_NITROGENOUS_BASE)
    else return true
}

const ValidateBody = (req, res, next) => {
    try {
        if (req.body.dna instanceof Array && req.body.dna.length > 0) {
            checkBody(req.body.dna)
            next()
        }
        else throw new InputException('JSON invalido', 400, req.body, CONSTANTS.ERROR_CODES.INPUT.INVALID_JSON)
    } catch (error) {
        res.status(400).json(error);
    }

};

module.exports = { ValidateBody };
