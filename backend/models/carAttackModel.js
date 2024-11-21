const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carAttacksSchema = new Schema({
  //will be added later
  carId: {
    type: String,
    required: true
  }

}, {timestamps: true})

module.exports = mongoose.model('Attack', carAttacksSchema)