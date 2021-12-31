const logger = require('../../config/logger');
const MutantModel = require('./mutant.model');

const Controller = {
    isMutant: async (data) => {
        const dnaData = data.dna;

        return await MutantModel.isMutant(dnaData);

    }

}

module.exports = Controller;
