// Include Express and restaurants data
const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000
const methodOverride = require('method-override')// 載入method override

require('./config/mongoose')

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
app.use(router)
// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhost:${port}`)
})