// Include Express and restaurants data
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json').results

// Include Template engine Handlebars
const exphbs = require('express-handlebars')

// Set Template engine Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Change Template engine to Handlebars
app.set('view engine', 'handlebars')

// Setting static files
app.use(express.static('public'))

// Setting routes
//Render index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants })
})

//Render show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id//String
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === restaurantId)
  res.render('show', { restaurant: restaurant })
})

// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhot:${port}`)
})