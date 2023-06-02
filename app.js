// Include Express and restaurants data
const express = require('express')
const app = express()
const restaurants = require('./restaurant.json')

// Include Template engine Handlebars
const exphbs = require('express-handlebars')

// Set Template engine Layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// Change Template engine to Handlebars
app.set('view engine', 'handlebars')
