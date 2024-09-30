const express = require('express')
const config = require('config')

const app = express()

require('./startup/cors')(app)
app.use((req, res, next) => {
  console.log(req.method, req.hostname, req.path)
  next()
})
app.use(express.json())
require('./startup/cookies')(app)
require('./startup/db')()
require('./startup/routes')(app)

const port = process.env.PORT || config.get('port')
app.listen(port, () => console.log(`Listening on port ${port}...`))
