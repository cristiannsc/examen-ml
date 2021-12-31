const logger = require('../../config/logger');
const DnaChecker = require('../Helpers/dnaChecker')
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
     * 
     * @param {String[]} dna 
     */
    static async isMutant(dna) {
        const dnaChecker = new DnaChecker(dna)
        logger.info('Función isMutant: ' + dnaChecker.isMutant)
        await dnaChecker.checkDna()
        return dnaChecker.isMutant
    }


}