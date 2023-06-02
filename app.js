// Include Express and restaurants data
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

// Include Template engine Handlebars
const exphbs = require('express-handlebars')

// Set Template engine Layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// Change Template engine to Handlebars
app.set('view engine', 'handlebars')

// Setting routes
app.get('/', (req, res) => {
  res.render('index')
})

// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhot:${port}`)
})