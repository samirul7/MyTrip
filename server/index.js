const express = require('express')
const config = require('config')

const routes = require('./startup/routes')

const app = express()

require('./startup/cors')(app)
require('./startup/db')()
require('./startup/routes')(app)

const port = process.env.PORT || config.get('port')
app.listen(port, () => console.log(`Listening on port ${port}...`))
