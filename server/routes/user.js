const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
  console.log('I am being called')
  const { error, value: user } = validate(
    _.pick(req.body, ['name', 'email', 'password'])
  )
  console.log(user)
  if (error) return res.status(400).send(error.details[0].message)
  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    let dbUser = new User(user)
    try {
      dbUser = await dbUser.save()
    } catch (error) {
      if (Object.keys(error.errors).includes('email'))
        return res.status(409).send(error.errors.email.properties.message)
      // 409 => conflict
      else return res.status(500).send('Server Error')
    }

    const accessToken = dbUser.generateAuthToken({ expiresIn: '5m' })
    const refreshToken = dbUser.generateAuthToken({ expiresIn: '7d' })
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    res.json({ accessToken })
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

module.exports = router
