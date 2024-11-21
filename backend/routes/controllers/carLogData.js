const LogData = require('../../models/carLogDataModel')
const mongoose = require('mongoose')
const Papa = require('papaparse')
const fs = require('fs')

//get log details
const getLogData = async (req, res) => {
  const { logid } = req.params
  if (!mongoose.Types.ObjectId.isValid(logid)) {
      return res.status(404).json({ error: 'No entry exists' })
  }
  const logData = await LogData.find({logid: logid}).sort({ createdAt: 1 })// will be change later on

  logData == (!logData) ? 
  res.status(404).json({error: 'Entry not found'}) : 
  res.status(200).json(logData) 
}

//create log data from file
const createLogData = async (req, res) => {
  //test api call, the actual code will be added later

  if (req.files == null)
    return res.status(400).json({ error: 'No file chosen' })

  // const logData = JSON.parse(req.body.logData)
  const { logid } = req.params

    try {
      const file = fs.readFileSync(req.files.file.tempFilePath, 'utf8')
      Papa.parse(file, {
        header: true,
        complete: results => {
          for (let i = 0; i < results.data.length-1; i++) {
            const data = results.data[i]
            let {['Time Stamp']: TimeStamp, ID, Extended, Dir, Bus, LEN, D1, D2, D3, D4, D5, D6, D7, D8} = data
            //modify timestamp and id to comply with the format that can_utils supports
            TimeStamp = (parseInt(TimeStamp) / 100000).toFixed(6)
            ID = ID?.slice(-3)
            const logdata = LogData.create({logid, TimeStamp, ID, Extended, Dir, Bus, LEN, D1, D2, D3, D4, D5, D6, D7, D8})
          }
        }
      })
      res.status(200).json({message: 'File successfully uploaded'})
      fs.unlink(req.files.file.tempFilePath, () => { console.log('temp file deleted')})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete multiple log data belong to a log entry
const deleteLogData = async (req, res) => {
  const { logid } = req.params
    if (!mongoose.Types.ObjectId.isValid(logid)) {
        return res.status(404).json({ error: 'No entry exists' })
    }
    
    const logData = await LogData.deleteMany({ logid: logid })

    logData == (!logData) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(logData) 
}

const updateLogData = async (req, res) => {

}

module.exports = { getLogData, createLogData, deleteLogData, updateLogData }
