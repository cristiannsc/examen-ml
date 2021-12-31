const config = {

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000

}

const promise = require('bluebird');

let options = { promiseLib: promise };

let pgp = require('pg-promise')(options);
const db = pgp(config);

module.exports = { db }
