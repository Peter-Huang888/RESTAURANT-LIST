// Include Express and restaurants data
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json').results
const Restaurant = require('./models/restaurant.js')
const methodOverride = require('method-override')// 載入method override
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
app.use(express.urlencoded({ extended: true }))
// Setting method override
app.use(methodOverride('_method'))
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
    .then(restaurant => res.render('show', { restaurant }))
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
app.put('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const filter = { _id: id }
  const update = req.body
  Restaurant.findOneAndUpdate({ _id: id }, update)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Delete restaurant
app.delete('/restaurants/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//Search-bar
app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.toLowerCase().trim()
  //看關鍵字是否包含在類別、餐廳中英名稱內
  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const filteredRestaurants = restaurantsData.filter(
        ({ name, name_en, category }) =>
          name.toLowerCase().includes(keyword) ||
          name_en.toLowerCase().includes(keyword) ||
          category.includes(keyword)
      )
      //Use condition operator to render corresponding 
      const renderPage = filteredRestaurants.length === 0 ? 'nosearchresult' : 'index'
      return res.render(renderPage, { restaurants: filteredRestaurants, keywords })
    })
    .catch(err => console.log(err))
})

// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhost:${port}`)
})