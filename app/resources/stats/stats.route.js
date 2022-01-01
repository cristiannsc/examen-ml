const express = require('express');
const router = express.Router();

const { getStats } = require('./stats.controller');

router.get('/', async (req, res, next) => {
    try {
        let result = await getStats()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
