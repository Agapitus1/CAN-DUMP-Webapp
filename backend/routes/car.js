const express = require('express')
const {
    getCars,
    getCar,
    createCar,
    deleteCar,
    updateCar
} = require('./controllers/car')


const router = express.Router()


router.get('/', getCars)
router.get('/:carid', getCar)
router.post('/create', createCar)
router.delete('/:carid', deleteCar)
router.patch('/:carid', updateCar)


module.exports = router