const express = require('express')

const auth = require('../routes/auth')
const user = require('../routes/user')
const trip = require('../routes/trip')
const photo = require('../routes/photo')
const video = require('../routes/video')

module.exports = function (app) {
  // app.use(express.json())

  app.use('/api/auth', auth)
  app.use('/api/user', user)
  app.use('/api/trip', trip)
  app.use('/api/photo', photo)
  app.use('/api/video', video)
}
