/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const glob = require('glob');

const logger = require('../config/logger');

const matches = glob.sync(path.join(global.appRoot, 'app/*/*.route.js'));

const routerV1 = express.Router();

routerV1.get('/v1', (req, res) => {
  res.status(200).send({ message: "Servicio ejecutado con exito", status: "OK" });
});

routerV1.head('/', (req, res) => {
  res.status(200).send('MUTANT-DETECTOR V1');
});


matches.forEach((item) => {
  const pathParsed = path.parse(item);
  routerV1.use(`/v1/${pathParsed.base.split('.')[0]}`, require(item));
  logger.debug(`route [/v1/${pathParsed.base.split('.')[0]}] added`);
});

module.exports = { v1: routerV1 };