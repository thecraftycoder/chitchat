const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Message = require('../models/Message')

module.exports = io => (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    try {
      if (!jwt.verify(msg.token, 'CHANGEME!')) {
        return console.log('not authorized')
      }

      const payload = jwt.decode(msg.token, 'CHANGEME!')

      User.findOne({ _id: payload._id }, async (err, userDoc) => {
        if (err) return console.error(err)

        const message = new Message()
        message.text = msg.text
        message.date = msg.date
        message.user = userDoc
        message.room = msg.room

        await message.save()

        io.emit('chat message', {
          ...msg,
          user: { username: userDoc.username }, // this ensures that msg is from the user that sent it
          token: undefined // don't want to send other users the token!
        })
      })
    } catch (err) {
      return console.error(err)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}
