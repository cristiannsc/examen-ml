const express = require('express');
const logger = require('../../config/logger');
const router = express.Router();

const { isMutant } = require('./mutant.controller');
const { ValidateBody } = require('./mutant.validate')

router.post('/', [ValidateBody], async (req, res, next) => {
    try {
        await isMutant(req.body) ? res.status(200).json({ isMutant: true }) : res.status(403).json({ isMutant: false })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
