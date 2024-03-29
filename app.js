// Include Express and restaurants data
const express = require('express')
const router = require('./routes')
const app = express()
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')// 載入method override
const flash = require('connect-flash')
require('./config/mongoose')
const port = process.env.PORT
// Include Template engine Handlebars
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
// Set Template engine Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// Change Template engine to Handlebars
app.set('view engine', 'handlebars')
// Handlebars Helper
Handlebars.registerHelper('sortMethod', function (sort, value, opts) {
  if (sort === value) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

// Setting static files
app.use(express.static('public'))
// Setting body-parser
app.use(express.urlencoded({ extended: true }))
// Setting method override
app.use(methodOverride('_method'))
// Setting express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}
))
usePassport(app)
app.use(flash())
// Setting local variables
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.logout_success_msg = req.flash('logout_success_msg')
  res.locals.login_warning_msg = req.flash('login_warning_msg')
  next()
})
// Setting routes
app.use(router)
// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhost:${port}`)
})
