const PORT = process.env.PORT || 5000

const startServer = require('./app')()

startServer(PORT)
