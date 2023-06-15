const express = require('express')
const router = express.Router()

// include modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
// setting routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
module.exports = router