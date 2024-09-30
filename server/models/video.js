const mongoose = require('mongoose')

const Video = mongoose.model(
  'Video',
  new mongoose.Schema({
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  })
)

exports.Video = Video
