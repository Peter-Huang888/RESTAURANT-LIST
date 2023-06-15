const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
//Render index page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

module.exports = router