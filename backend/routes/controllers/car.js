const Car = require('../../models/carModel')
const mongoose = require('mongoose')

//GET all cars
const getCars = async (req, res) => {
    const cars = await Car.find({}).sort({createdAt: -1})
    res.status(200).json(cars)
}

//GET single car
const getCar = async (req, res) => {
    const { carid } = req.params
    if(!mongoose.Types.ObjectId.isValid(carid)){
        return res.status(404).json({error: 'CarID invalid'})
    }

    const car = await Car.findById(carid)

    //if car entry does not exist
    car == (!car) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(car)   
}

//CREATE new car
const createCar = async (req, res) => {
    const { manufacturer, model, year, descriptions } = req.body

    try {
        const car = await Car.create({ manufacturer, model, year, descriptions })
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE a workout
const deleteCar = async (req, res) => {
    const { carid } = req.params

    if(!mongoose.Types.ObjectId.isValid(carid)){
        return res.status(404).json({error: 'CarID invalid'})
    }

    const car = await Car.findOneAndDelete({_id: carid}) 

    car == (!car) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(car)  
}

//UPDATE a workout
const updateCar = async (req, res) => {
    const { carid } = req.params
    if(!mongoose.Types.ObjectId.isValid(carid)){
        return res.status(404).json({error: 'No entry exists'})
    }

    const car = await Car.findOneAndUpdate({_id: carid}, {...req.body}, {new: true})

    car == (!car) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(car)
}

module.exports = { getCars, getCar, createCar, deleteCar, updateCar }