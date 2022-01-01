const CONSTANTS = require('../../helpers/constant')
const express = require('express');
const router = express.Router();

const { isMutant } = require('./mutant.controller');
const { ValidateBody } = require('./mutant.validate')

router.post('/', [ValidateBody], async (req, res, next) => {
    try {
        let result = await isMutant(req.body)
        result ?
            res.status(200).json({ isMutant: true, message: CONSTANTS.MESSAGES.RESPONSE.MUTANT }) :
            res.status(403).json({ isMutant: false, message: CONSTANTS.MESSAGES.RESPONSE.NON_MUTANT })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
