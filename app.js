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

//Search-bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  //看關鍵字是否包含在類別、餐廳中英名稱內
  const filteredRestaurants = restaurants.filter(
    ({ name, name_en, category }) =>
      name.toLowerCase().includes(keyword) ||
      name_en.toLowerCase().includes(keyword) ||
      category.includes(keyword)
  )
  //Use condition operator to render corresponding 
  const renderPage = filteredRestaurants.length === 0 ? 'nosearchresult' : 'index'
  res.render(renderPage, { restaurants: filteredRestaurants, keyword })
})

// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhot:${port}`)
})