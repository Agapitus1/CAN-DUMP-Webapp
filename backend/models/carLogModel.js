const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carLogSchema = new Schema({
  //the schema following .csv file column from savvyCAN, the column will follow the can message format that socketCAN can read and send messages
  carid: { type: String, required: true },
  carModel: { type: String, required: true },
  title: { type: String, required: true },
  descriptions: String,
}, {timestamps: true})

module.exports = mongoose.model('log', carLogSchema)

//some ideas about how to import csv data: https://www.positronx.io/how-to-import-csv-file-records-in-mongodb-with-node-js/