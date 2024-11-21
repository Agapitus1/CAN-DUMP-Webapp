const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carLogDataSchema = new Schema({
  //the schema following .csv file column from savvyCAN, the column will follow the can message format that socketCAN can read and send messages
  logid: { type: String, required: true }, //link to log model
  TimeStamp: String,
  ID: String,
  Extended: String,
  Dir: String,
  Bus: String,
  LEN: String,
  D1: String,
  D2: String,
  D3: String,
  D4: String,
  D5: String,
  D6: String,
  D7: String,
  D8: String
})

module.exports = mongoose.model('logdata', carLogDataSchema)