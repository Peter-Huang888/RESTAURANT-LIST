const express = require('express')
const router = express.Router()

// include modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
// setting routes
router.use('/', home)
router.use('/restaurants', restaurants)
module.exports = router