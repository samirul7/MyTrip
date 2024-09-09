const express = require('express')
const { Photo } = require('../models/photo')
const { putObjectUrl } = require('../services/apiAwsS3')

const router = express.Router()

router.get('/url', async (req, res) => {
  const { fileName, fileType } = req.query
  try {
    const url = await putObjectUrl(
      `photos/${fileName}.${fileType.split('/')[1]}`,
      fileType
    )
    res.send({ url })
  } catch (error) {
    console.log('Something went wrong', error)
    res.status(404).send('Bad Request')
  }
})

module.exports = router
