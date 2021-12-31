const StatsModel = require('./stats.model');

const Controller = {
    getStats: async () => {
        return await StatsModel.getStats();
    }

}

module.exports = Controller;
