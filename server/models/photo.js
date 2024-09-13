const mongoose = require('mongoose')

const Photo = mongoose.model(
  'Photo',
  new mongoose.Schema({
    fileName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    fileType: {
      type: String,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Trip',
    },
  })
)

exports.Photo = Photo
