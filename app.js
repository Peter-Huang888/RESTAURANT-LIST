// Include Express and restaurants data
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json').results
const Restaurant = require('./models/restaurant.js')
const mongoose = require('mongoose') //載入mongoose
// 如果在非正式環境下，載入dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到 mongoDB

const db = mongoose.connection //取得資料庫連線狀態
// 連線失敗
db.on('error', () => {
  console.log('mongoDB error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongoDB connected')
})


// Include Template engine Handlebars
const exphbs = require('express-handlebars')

// Set Template engine Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Change Template engine to Handlebars
app.set('view engine', 'handlebars')

// Setting static files
app.use(express.static('public'))

// Setting body-parser
app.use(express.urlencoded({extended: true}))

// Setting routes
//Render index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

//Render new page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
//Create new restaurant
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//Render detail page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show',{restaurant}))
    .catch(err => console.log(err))
})

// Render edit page
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// Edit restaurant
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = Number(req.body.rating)
      restaurant.description = req.body.description
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
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
  console.log(`Welcome to my restaurant website: http://localhost:${port}`)
})