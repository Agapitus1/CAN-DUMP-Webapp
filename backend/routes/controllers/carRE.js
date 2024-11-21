const express = require('express')
const router = express.Router()

// get all RE entries
router.get("", (req, res) => {
  res.json({mssg: 'get all RE entries'})
})

//get 1 RE entry
router.get('/:id', (req, res) => {
  res.json({mssg: 'get 1 RE entries'})
})

//create a new RE entry
router.post('/create', (req, res) => {
  res.json({mssg: 'get 1 RE entries'})
})

//delete a RE entry
router.delete('/:id', (req, res) => {
  res.json({mssg: 'delete RE entry'})
})

//update a RE entry
router.patch('/:id', (req, res) => {
  res.json({mssg: 'update RE entry'})
})

module.exports = router