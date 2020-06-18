const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = (req, res, next) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  try {
    if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
      const payload = jwt.decode(token, 'CHANGEME!')

      User.findOne({ _id: payload._id }, (err, userDoc) => {
        if (err) return res.status(500).send(err)
        req.user = userDoc
        return next()
      })
    } else {
      res.status(401).send('Unauthorized')
    }
  } catch (err) {
    res.status(401).send('Unauthorized')
  }
}

module.exports = authenticate
