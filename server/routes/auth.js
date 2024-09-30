const express = require('express')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.sendStatus(401)
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    const token = user.generateAuthToken({ expiresIn: '1d' })
    return res.json({ token, _id: user._id, name: user.name })
  }
  res.sendStatus(401)
})

module.exports = router
