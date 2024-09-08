const mongoose = require('mongoose')

const Trip = mongoose.model(
  'Trip',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    location: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
  })
)

exports.Trip = Trip
