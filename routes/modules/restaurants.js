const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const User = require('../../models/users')

//Render new page
router.get('/new', (req, res) => {
  res.render('new')
})
//Create new restaurant
router.post('/', (req, res) => {
  const body = req.body
  body.userId = req.user._id
  Restaurant.create(body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//Render detail page
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// Render edit page
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// Edit restaurant
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const update = req.body
  Restaurant.findOneAndUpdate({ _id, userId }, update)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// Delete restaurant
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.remove()})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router