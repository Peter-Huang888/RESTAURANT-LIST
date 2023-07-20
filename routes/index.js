const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
// include modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
// setting routes
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
module.exports = router