require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { createServer } = require("http")
const { Server }= require('socket.io')


const carRoutes = require('./routes/car')
const carLogRoutes = require('./routes/carLog')
const carLogDataRoutes = require('./routes/carLogData')
const carAttackRoutes = require('./routes/carAttack')

app.use(express.json())

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow traffic from any domains
      return callback(null, true)
    },
  })
)

//socketio
// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//   path: "/ws/"
// })
// io.on('connection', socket => {
//   console.log('connected')
//   socket.on('echo', data => {
//     io.emit('message', data)
//   })
// })

// io.listen(5001)

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${__dirname}/temp`,
    safeFileNames: true,
    preserveExtension: true
  })
);



//log POST methods and routes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  // req.io = io
  next();
})


app.get('/', (req, res) => {
  res.json({mssg: "hello world"});
})

//use routes
app.use('/api/car', carRoutes)
app.use('/api/log', carLogRoutes)
app.use('/api/attack/', carAttackRoutes)

// app.use('/api/re/', carRERoutes)
app.use('/api/logdata', carLogDataRoutes)




//connect to mongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => { console.log('Listen on port', process.env.PORT) }) //backend port (http://localhost:5000)
  })
  .catch(e => console.log(e))

module.exports = app