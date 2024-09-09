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
  })
)

exports.Photo = Photo
