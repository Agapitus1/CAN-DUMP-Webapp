const express = require('express')

const {
    getCarLogs,
    createCarLog,
    getLog,
    deleteLog,
    getAllLogs,
    updateLog
} = require('./controllers/carLog')

const router = express.Router()

router.get('/', getAllLogs)
router.get('/:carid', getCarLogs)
router.get('/:carid/:logid', getLog)
router.post('/:carid/create', createCarLog)
router.delete('/:logid', deleteLog)
router.patch('/:logid', updateLog)

module.exports = router