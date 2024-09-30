const express = require('express')
const auth = require('../middlewares/auth')

const { Photo } = require('../models/photo')
const {
  getObjectUrl,
  putObjectUrl,
  deleteObjectUrl,
} = require('../services/apiAwsS3')

const router = express.Router()

router.get('/', [auth], async (req, res) => {
  const { tripId } = req.query
  try {
    // find the photos in DB with trip id
    const photos = await Photo.find({ tripId })

    // generate the url for retriving the photos from AWS S3
    const promises = photos.map(async ({ fileName, _id }) => {
      return {
        _id,
        url: await getObjectUrl(`photos/${tripId}-${fileName}`),
      }
    })
    Promise.all(promises)
      .then((photos) => {
        res.send(photos)
      })
      .catch((error) => {
        console.error('Something went Wrong')
      })
  } catch (error) {
    res.status(400).send('Bad Request')
    console.error('Something went wrong', error)
  }
})

router.delete('', [auth], async (req, res) => {
  const { _id } = req.query
  console.log(_id)
  try {
    const { tripId, fileName } = await Photo.findByIdAndDelete(_id)
    const s3Res = await deleteObjectUrl(`photos/${tripId}-${fileName}`)

    res.send({
      url: s3Res,
    })
  } catch (err) {
    console.log('Something wrong')
  }
})

router.post('/', [auth], async (req, res) => {
  console.log('I am being called post photo')
  console.log(req.body)
  try {
    let photo = new Photo({
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      tripId: req.body.tripId,
    })

    photo = await photo.save()
    console.log(photo)
  } catch (error) {
    console.log(error)
  }
})

// generate url for putting in AWS S3
router.get('/url', [auth], async (req, res) => {
  const { tripId, fileInfo } = req.query
  if (!tripId || !fileInfo) return req.sendStatus(400)
  const urls = await Promise.allSettled(
    fileInfo.map(
      async (file) =>
        await putObjectUrl(`photos/${tripId}-${file.name}`, file.type, file.id)
    )
  )
  return res.send(
    urls.map((url) =>
      url.status === 'fulfilled'
        ? { status: url.status, id: Number(url.value.id), url: url.value.url }
        : { status: url.status, id: Number(url.reason.id) }
    )
  )
  // const { tripId, fileName, fileType } = req.query
  // console.log('bye', tripId)
  // try {
  //   const url = await putObjectUrl(`photos/${tripId}-${fileName}`, fileType)
  //   res.send({ url })
  // } catch (error) {
  //   console.log('Something went wrong', error)
  //   res.status(404).send('Bad Request')
  // }
})

module.exports = router
