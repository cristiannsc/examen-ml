const winston = require('winston');

/*
Levels:
error   -> 0
warn    -> 1
info    -> 2
verbose -> 3
debug   -> 4
silly   -> 5
*/

const config = {
    console: {
        level: process.env.LOG_LEVEL_CONSOLE || 'debug',
        handleExceptions: true
    }
}

module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.printf(msg => `${msg.level}: ${msg.message}`)
    ),
    transports: [
        new winston.transports.Console(config.console)
    ]
});
