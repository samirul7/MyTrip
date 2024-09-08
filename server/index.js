const express = require('express')
const config = require('config')

// test
const { getObjectUrl } = require('./services/apiAwsS3')

const app = express()

require('./startup/cors')(app)
require('./startup/db')()
require('./startup/routes')(app)

const port = process.env.PORT || config.get('port')
app.listen(port, () => console.log(`Listening on port ${port}...`))
