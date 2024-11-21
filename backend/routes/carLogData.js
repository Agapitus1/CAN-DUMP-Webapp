const express = require('express')
const { 
  getLogData, 
  createLogData, 
  deleteLogData, 
  updateLogData 
} = require('./controllers/carLogData')

const router = express.Router()

router.get('/:logid', getLogData)
router.post('/:logid/create', createLogData)
router.patch('/:logid', updateLogData)
router.delete('/:logid', deleteLogData)

module.exports = router