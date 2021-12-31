const logger = require('../../config/logger');
const CONSTANTS = require('../Helpers/constant')
module.exports = class DnaChecker {
    constructor(data) {
        this.dataDna = data
        this.rowQty = data.length
        this.matrix = data ? this.dataDna.map(row => row.split("")) : []
        this.mutantFactor = 0
        this.isMutant = null
    }

    /**
     * Función encargada de pasar el this.matrixay de string a una matriz
     * 
     */
    /* async createMatrix() {
        this.matrix = this.dataDna.map(row => row.split(""))
        return this.matrix
    } */

    /**
     * Función encargada verificar un array de Strings
     * @returns boolean indicando si es mutante o no
     */
    async checkArray() {
        this.dataDna.map((row) => {
            for (const pattern of CONSTANTS.MUTANT_PATTERN) {
                row.includes(pattern) ? this.mutantFactor++ : this.mutantFactor
            }
        })
        console.log('mutant factor: ', this.mutantFactor)
        return this.mutantFactor >= CONSTANTS.MIN_MUTANT_FACTOR
    }

    /**
     * Función encargada verificar verticalmente la matriz
     * @returns boolean indicando si es mutante o no
     */
    async checkVertical() {
        let transposedDataDNA = [];
        for (const [i, row] of this.matrix.entries()) {
            let newRow = ""
            for (const [j, element] of row.entries()) {
                newRow = newRow + this.matrix[j][i]
            }
            transposedDataDNA.push(newRow)
        }
        await this.checkArray(transposedDataDNA)
        return this.mutantFactor >= CONSTANTS.MIN_MUTANT_FACTOR
    }

    /**
     * Función que permite obtener diagonales desde la izquierda a la derecha de la matriz
     * @returns array de strings que representan las diagonales
     */
    async getLeftToRightDiagonal() {
        // Se agregan los elementos a la diagonales que van desde la izquierda a derecha
        let lrDiagonals = Array.from(Array(this.rowQty * 2 - 1), () => "");
        for (var i = 0; i < this.rowQty; i++) {
            for (var j = 0; j < this.rowQty; j++) {
                lrDiagonals[i + j] = lrDiagonals[i + j].concat(this.matrix[i][j]);
            }
        }
        return lrDiagonals
    }

    /**
     * Función que permite obtener diagonales desde la derecga a la izquierda de la matriz
     * @returns array de strings que representan las diagonales
     */
    async getRightToLeftDiagonal() {
        // Se agregan los elementos a la diagonales que van desde la izquierda a derecha
        // Se agregan los elementos a las diagonales que van desde la derecha a la izquierda
        let rlDiagonals = Array.from(Array(this.rowQty * 2 - 1), () => "");
        for (var i = 0; i < this.rowQty; i++) {
            for (var j = this.rowQty - 1; j >= 0; j--) {
                rlDiagonals[this.rowQty - 1 - j + i] = rlDiagonals[this.rowQty - 1 - j + i].concat(this.matrix[i][j]);
            }
        }
        return rlDiagonals
    }


    /**
     * Funcion que verifica las diagonales de la matriz
     * @returns boolean indicando si es mutante o no
     */
    async checkDiagonals() {

        let lrDiagonals = await this.getLeftToRightDiagonal()

        let rlDiagonals = await this.getRightToLeftDiagonal()

        logger.info(JSON.stringify(lrDiagonals))
        logger.info(JSON.stringify(rlDiagonals))

        // Se concatenan ambos arrays y se filtran solo las diagonales que cuentan con más de 4 letras
        let result = lrDiagonals.concat(rlDiagonals).filter(row => row.length >= CONSTANTS.MIN_LENGTH_MUTANT_ADN)
        logger.info(JSON.stringify(result))
        await this.checkArray(result)
        return this.mutantFactor >= CONSTANTS.MIN_MUTANT_FACTOR
    }

    async checkDna() {
        this.isMutant = await this.checkArray() || await this.checkVertical() || await this.checkDiagonals() ? true : false
    }



}