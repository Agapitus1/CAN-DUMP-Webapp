const express = require('express')

const {
  setupInterface,
  replayAttack,
  shutdownInterface,
  stopReplayAttack
} = require('./controllers/carAttack')

const router = express.Router()

router.post('/setup_interface', setupInterface)
router.post('/shutdown_interface', shutdownInterface)
router.post('/replay', replayAttack)
router.get('/stop_replay', stopReplayAttack)


module.exports = router