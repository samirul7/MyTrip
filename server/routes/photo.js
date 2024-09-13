const express = require('express')
const { Photo } = require('../models/photo')
const { getObjectUrl, putObjectUrl } = require('../services/apiAwsS3')

const router = express.Router()

router.get('/', async (req, res) => {
  const { tripId } = req.query
  try {
    const photos = await Photo.find({ tripId })
    const promises = photos.map(async ({ fileName, _id }) => {
      return {
        _id,
        url: await getObjectUrl(`photos/${fileName}`),
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

router.get('/url', async (req, res) => {
  const { fileName, fileType } = req.query
  try {
    const url = await putObjectUrl(`photos/${fileName}`, fileType)
    res.send({ url })
  } catch (error) {
    console.log('Something went wrong', error)
    res.status(404).send('Bad Request')
  }
})

router.post('/', async (req, res) => {
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

module.exports = router
