const express = require('express')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.sendStatus(403)
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    const accessToken = user.generateAuthToken({ expiresIn: '10s' })
    const refreshToken = user.generateAuthToken({ expiresIn: '15s' })
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 15,
      // maxAge: 1000 * 60 * 60 * 24 * 7,
      // secure: true,
    })
    return res.json({ accessToken })
  }
  res.sendStatus(403)
})

router.post('/refresh', async (req, res) => {
  console.log('/auth/refresh')
  res.send('Looks good')
})

module.exports = router
