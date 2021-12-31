const { db } = require('../../../config/database');
const logger = require('../../../config/logger');
const CONSTANTS = require('../../Helpers/constant');
const DatabaseException = require('../../Exceptions/DatabaseException');

/**
 * Restricciones a crear:
 * 1.- Matriz es de NxN
 * 2.- Las letras de los Strings solo pueden ser: (A,T,C,G)
 * 3.- Mutante si tiene más de 1 secuancia de 4 letras iguales. Ejemplo [[A,A,A,A,T],[C,C,C,C,T]]
 */
module.exports = class StatsModel {
    constructor() {
    }

    static async getStats() {
        try {
            return await db.one('SELECT (count(*)filter (where mutant))::integer as count_mutant_dna, (count(*) filter (where not mutant))::integer as count_human_dna, round((count(*)filter (where mutant)) * 1.0 / greatest( (count(*) filter (where not mutant)), 1 ) * 1.0, 2)::float as ratio from dna_record;');
        } catch (error) {
            logger.error(error.message)
            throw new DatabaseException('Error al realizar el calculo de las estadísticas', 400, CONSTANTS.ERROR_CODES.DATABASE.STATS)
        }
    }

}