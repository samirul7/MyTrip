const cors = require('cors')

module.exports = function (app) {
  app.use(
    cors({
      origin: 'http://localhost:5173', // Replace with your frontend domain
      methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type'], // Allowed headers
    })
  )
}
