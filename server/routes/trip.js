const express = require('express')
const { Trip } = require('../models/trip')
const auth = require('../middlewares/auth')
const { User } = require('../models/user')

const router = express.Router()

router.get('/', [auth], async (req, res) => {
  try {
    let tripInfo = await Trip.findById(req.query.id).select([
      'name',
      'location',
    ])
    res.send(tripInfo)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/all', [auth], async (req, res) => {
  try {
    const { tripIds } = (await User.findOne({ _id: req._id })
      .populate('tripIds')
      .select('tripIds')) || { tripIds: null }
    res.json(tripIds)
  } catch {
    res.sendStatus(500)
  }
})

router.post('/', [auth], async (req, res) => {
  try {
    let trip = new Trip({
      name: req.body.name,
      location: req.body.location,
    })
    trip = await trip.save()

    // update user tripIds
    await User.updateOne({ _id: req._id }, { $push: { tripIds: trip._id } })

    res.send(trip)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
