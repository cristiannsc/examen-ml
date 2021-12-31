const express = require('express');
const logger = require('../../config/logger');
const router = express.Router();

const { isMutant } = require('./mutant.controller');


router.post('/', async (req, res, next) => {
    try {
        return res.status(200).send(await isMutant(req.body));
    } catch (error) {
        next(error)
    }
})

module.exports = router;
