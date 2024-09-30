const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/url', [auth], (req, res) => {
  console.log('from video')
  res.send('all good')
})

module.exports = router
