const logger = require('../../config/logger');
const InputException = require('../Exceptions/InputException')

checkBody = (body) => {

    /* if (body.length < 4)
        throw new InputException('La cantidad de filas es menor de la cantidad necesaria', 400, { row_length: body.length }, 'E_BODY_LENGTH')
    else if (!(body.every(row => row.length >= 4))) {
        const result = body.filter(row => row.length < 4);
        throw new InputException('El largo de filas es menor de la cantidad necesaria', 400, { col_length: result[0].length }, 'E_COLUMN_LENGTH')
    } */
    if (body.every((row, index, arr) => row.length === arr[0].length)) {
        if (body.length != body[0].length)
            throw new InputException('La matriz debe ser cuadrada', 400, { row_length: body.length, col_length: body[0].length }, 'E_SQUARE_MATRIX')
    } else {
        const resultRows = body.filter((row, index, arr) => row.length === body.length);
        const result = body.filter((row, index, arr) => row.length !== resultRows[0].length);
        throw new InputException('La matriz debe ser cuadrada', 400, { row_length: body.length, col_length: result[0].length }, 'E_SQUARE_MATRIX')
    }
    let nonValidCharacterArray = body.filter(row => /[^ATCG|^atcg]/.test(row))
    if (nonValidCharacterArray.length > 0)
        throw new InputException('Caracter no valido en la secuencia de ADN', 400, { invalid_rows: nonValidCharacterArray.toString() }, 'E_NON_NITROGENOUS_BASE')
    else return true
}

const ValidateBody = (req, res, next) => {
    try {
        if (req.body.dna instanceof Array && req.body.dna.length > 0) {
            checkBody(req.body.dna)
            next()
        }
        else throw new InputException('JSON invalido', 400, req.body, 'E_INVALID_JSON')
    } catch (error) {
        res.status(400).json(error);
    }

};

module.exports = { ValidateBody };
