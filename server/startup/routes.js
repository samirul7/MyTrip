const express = require('express')

const trip = require('../routes/trip')

module.exports = function (app) {
  app.use(express.json())

  app.use('/api/trip', trip)
}
