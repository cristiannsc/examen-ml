const moment = require('moment-timezone');
const { db } = require('../../../config/database');
const logger = require('../../../config/logger');
const CONSTANTS = require('../../helpers/constant');
const DnaChecker = require('../../helpers/dnaChecker')
const DatabaseException = require('../../exceptions/databaseException');

/**
 * Restricciones a crear:
 * 1.- Matriz es de NxN
 * 2.- Las letras de los Strings solo pueden ser: (A,T,C,G)
 * 3.- Mutante si tiene más de 1 secuancia de 4 letras iguales. Ejemplo [[A,A,A,A,T],[C,C,C,C,T]]
 */
module.exports = class MutantModel {
    constructor() {
    }

    /**
     * Función encargada de verificar si una cadena de ADN corresponde a un mutante o no
     * @param {String[]} dna 
     */
    static async isMutant(dna) {
        const dnaChecker = new DnaChecker(dna)
        await dnaChecker.checkDna()
        logger.info('Función isMutant: ' + dnaChecker.isMutant)
        await this.createRecord(dna, dnaChecker.isMutant)
        return dnaChecker.isMutant
    }


    static async createRecord(dna, isMutant) {
        try {
            const existSequence = await db.oneOrNone('SELECT id from dna_record WHERE dna_sequence = $1', [JSON.stringify(dna)]);
            if (!existSequence) {
                await db.one('INSERT INTO dna_record(dna_sequence, mutant, created_at) VALUES($1, $2, $3) RETURNING id',
                    [JSON.stringify(dna), isMutant, moment().format('YYYY-MM-DD HH:mm:ss')]);
            }
        } catch (error) {
            logger.error(error.message)
            throw new DatabaseException('No se pudo crear el registro de la secuencia de ADN entregada', 400, CONSTANTS.ERROR_CODES.DATABASE.CREATE)
        }
    }

}