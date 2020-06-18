module.exports = function () {
  const cool = require('cool-ascii-faces')
  const express = require('express')
  const mongoose = require('mongoose')
  const morgan = require('morgan')
  const AuthController = require('./controllers/auth')
  const MessageController = require('./controllers/messages')
  const SocketController = require('./controllers/socket-events')

  const app = express()

  app.use(express.static('static'))
  app.use(express.json())
  app.use(morgan('tiny'))

  app.use('/', AuthController)
  app.use('/', MessageController)
  app.get('/cool', (req, res) => res.send(cool()))

  const http = require('http').createServer(app)
  const io = require('socket.io')(http)

  io.on('connection', SocketController(io))

  const connectDatabase = async (databaseName = 'chatroom', hostname = 'localhost') => {
    const database = await mongoose.connect(
      `mongodb://${hostname}/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )

    console.log(`Database connected at mongodb://${hostname}/${databaseName}...`)

    return database
  }

  const startServer = port => {
    http.listen(port, async () => {
      await connectDatabase()
      console.log(`Server listening on port ${port}...`)
    })
  }

  return startServer
}
