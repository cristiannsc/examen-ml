const express = require('express');
const router = express.Router();

const { getStats } = require('./stats.controller');

router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await getStats())
    } catch (error) {
        next(error)
    }
})

module.exports = router;
