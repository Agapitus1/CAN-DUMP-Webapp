const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carRESchema = new Schema({
  //will be added later
}, {timestamps: true})

module.exports = mongoose.model('RE', carRESchema)