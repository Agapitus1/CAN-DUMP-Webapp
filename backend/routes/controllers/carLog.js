const Log = require('../../models/carLogModel')
const mongoose = require('mongoose')


//GET all logs
const getAllLogs = async (req, res) => {
    const carLogs = await Log.find({}).sort({createdAt: 1})
    res.status(200).json(carLogs)
}

//GET logs from a car entry
const getCarLogs = async (req, res) => {
    const { carid } = req.params

    if (!mongoose.Types.ObjectId.isValid(carid)) {
        return res.status(404).json({ error: 'No entry exists' })
    }

    const logs = await Log.find({ carid: carid })
    res.status(200).json(logs)
}

//get a single log
const getLog = async (req, res) => {
    const { logid } = req.params
    if (!mongoose.Types.ObjectId.isValid(logid)) {
        return res.status(404).json({ error: 'No entry exists' })
    }
    const log = await Log.findById(logid)
    res.status(200).json(log)
}

//CREATE new car log
const createCarLog = async (req, res) => {
    const { carid, carModel, title, descriptions } = req.body
    
    try {
        const carLog = await Log.create({ carid, carModel, title, descriptions })
        res.status(200).json(carLog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//DELETE a log
const deleteLog = async (req, res) => {
    const { logid } = req.params
    if (!mongoose.Types.ObjectId.isValid(logid)) {
        return res.status(404).json({ error: 'No entry exists' })
    }
    
    const log = await Log.findOneAndDelete({ _id: logid })

    log == (!log) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(log) 
}

const updateLog = async (req, res) => {
    const { logid } = req.params

    if (!mongoose.Types.ObjectId.isValid(logid)) {
        return res.status(404).json({ error: 'No entry exists' })
    }

    const log = await Log.findOneAndUpdate({ _id: logid }, {...req.body}, { new: true })

    log == (!log) ? 
    res.status(404).json({error: 'Entry not found'}) : 
    res.status(200).json(log) 
}

module.exports = {
    getAllLogs,
    getCarLogs,
    getLog,
    createCarLog,
    deleteLog,
    updateLog
}