const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Render new page
router.get('/new', (req, res) => {
  res.render('new')
})
//Create new restaurant
router.post('', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//Render detail page
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// Render edit page
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// Edit restaurant
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const filter = { _id: id }
  const update = req.body
  Restaurant.findOneAndUpdate({ _id: id }, update)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Delete restaurant
router.delete('/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router