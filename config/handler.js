const logger = require('./logger');
const CONSTANTS = require('../app/helpers/constant')

exports.errorHandler = (err, req, res, next) => {
    logger.error(`Error al ejecutar el servicio
    Summary: ${err.summary || 'Sin Resumen'}
    Message: ${err.message}
    CODE: ${err.code || CONSTANTS.ERROR_CODES.DEFAULT}
    Stack: ${err.stack}`);
    res.status(err.status || 500);
    res.send({
        status: 'ERROR',
        code: err.code || CONSTANTS.ERROR_CODES.DEFAULT,
        message: err.message
    });
};