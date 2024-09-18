const express = require('express')

const user = require('../routes/user')
const trip = require('../routes/trip')
const photo = require('../routes/photo')

module.exports = function (app) {
  app.use(express.json())

  app.use('/api/user', user)
  app.use('/api/trip', trip)
  app.use('/api/photo', photo)
}
