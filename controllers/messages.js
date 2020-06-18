const Message = require('../models/Message')
const authenticate = require('../helpers/jwtMiddleware')
const express = require('express')
const router = express.Router()

router.get('/messages', [authenticate], (req, res) => {
  Message.find({})
    .populate('user', 'username')
    .exec((err, messages) => {
      if (err) return res.status(500).send(err)
      return res.send({ messages })
    })
})

module.exports = router
