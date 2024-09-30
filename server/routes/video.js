const express = require('express')
const auth = require('../middlewares/auth')
const { putObjectUrl, getObjectUrl } = require('../services/apiAwsS3')
const { Video } = require('../models/video')

const router = express.Router()

router.get('/', [auth], async (req, res) => {
  const { tripId } = req.query
  console.log(tripId)
  if (!tripId) return res.sendStatus(400)
  try {
    const videos = await Video.find({ tripId })
    const urls = await Promise.allSettled(
      videos.map(async (video) => ({
        _id: video._id,
        url: await getObjectUrl(`videos/${tripId}-${video.fileName}`),
      }))
    )
    res.send(
      urls
        .filter((url) => url.status === 'fulfilled')
        .map((url) => ({ _id: url.value._id, url: url.value.url }))
    )
  } catch (err) {
    res.sendStatus(500)
  }
})

router.post('/', [auth], async (req, res) => {
  const { tripId, fileName, fileType } = req.body
  if (!tripId || !fileName || !fileType) return res.sendStatus(400)
  try {
    let video = new Video({ tripId, fileName, fileType })
    video = await video.save()
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
})

// for putting videos in AWS S3
router.get('/url', [auth], async (req, res) => {
  const { tripId, fileInfo } = req.query
  if (!tripId || !fileInfo) return req.sendStatus(400)

  // get urls from aws S3 client
  const urls = await Promise.allSettled(
    fileInfo.map(
      async (file) =>
        await putObjectUrl(`videos/${tripId}-${file.name}`, file.type, file.id)
    )
  )

  //   filter error message and then send
  return res.send(
    urls.map((url) =>
      url.status === 'fulfilled'
        ? { status: url.status, id: Number(url.value.id), url: url.value.url }
        : { status: url.status, id: Number(url.reason.id) }
    )
  )
})

module.exports = router
