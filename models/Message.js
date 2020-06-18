const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const messageSchema = Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  room: {
    type: String,
    required: true
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
