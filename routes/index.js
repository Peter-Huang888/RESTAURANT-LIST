const express = require('express')
const router = express.Router()

// include modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
// setting routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/users', users)
module.exports = router