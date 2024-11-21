const { spawn, exec } = require('child_process')
const express = require('express')
const router = express.Router()
const can = require('socketcan')

//setup interface
const setupInterface = async (req, res) => {
  const { can_int, bitrate } = req.body
  exec(`./api/setup_interface.sh ${can_int} ${bitrate}`, (err, stdout, stderr) => {
    if (err !== null) {
      res.status(200).json({error: err});
    }
    else {
      res.status(200).json({stdout: stdout, stderr: stderr})
    }
  })
}

const shutdownInterface = async (req, res) => {
  const { can_int } = req.body
  exec(`./api/shutdown_interface.sh ${can_int}`, (err, stdout, stderr) => {
    if (err !== null) {
      res.status(200).json({error: err});
    }
    else {
      res.status(200).json({stdout: stdout, stderr: stderr})
    }
  })
}

// replay
const replayAttack = async (req, res) => {
  let { can_int, can_id, d0, d1, d2, d3, d4, d5, d6, d7, loopInterval } = req.body 
  const message = `${can_int} ${can_id}#${d0}${d1}${d2}${d3}${d4}${d5}${d6}${d7}`
  loopInterval = loopInterval / 1000 //in second
  const proc = exec(`./api/replay_attack.sh ${message} ${loopInterval}`, (err, stdout, stderr) => {
    if (err !== null) {
      res.status(200).json({error: err});
    }
    else {
      res.status(200).json({stdout: stdout, stderr: stderr})
    }
  })
  // const proc = spawn(`./api/replay_attack.sh ${message} ${loopInterval}`)
  // proc.stderr.on('data', data => {
  //   res.status(500).json({data: data})
  // })
  // proc.on('close', code => {
  //   res.status(200).json({code: code})
  // })

  //to prevent the child process running after exec is completed, kill it after 10 seconds
  setTimeout(() => {
    proc.kill()
  }, 10*1000, 0)
}

const stopReplayAttack = async (req, res) => {
  exec('^C', (err, stdout, stderr) => {
    if (err !== null) {
      res.status(200).json({error: err});
    }
    else {
      res.status(200).json({stdout: stdout, stderr: stderr})
    }
  })
}

module.exports = { setupInterface, shutdownInterface, replayAttack, stopReplayAttack }