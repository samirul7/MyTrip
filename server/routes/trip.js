const express = require('express')
const { Trip } = require('../models/trip')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    let tripInfo = await Trip.findOne({ _id: req.params.id }).select([
      'name',
      'location',
    ])

    res.send(tripInfo)
  } catch (error) {
    res.status(500).send('Something went wrong')
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    let trip = new Trip({
      name: req.body.name,
      location: req.body.location,
    })
    trip = await trip.save()
    res.send(trip)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message || 'Bad request')
  }
})

module.exports = router
