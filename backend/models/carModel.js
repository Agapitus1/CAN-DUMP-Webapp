const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carsSchema = new Schema({
  manufacturer: { type: String, required: true},
  model: { type: String, required: true},
  year: { type: String, required: true },
  descriptions: String
}, {timestamps: true})

module.exports = mongoose.model('car', carsSchema)