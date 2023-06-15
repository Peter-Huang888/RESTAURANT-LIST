// Include Express and restaurants data
const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000
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
app.use(router)
// Start and listen on server
app.listen(port, () => {
  console.log(`Welcome to my restaurant website: http://localhost:${port}`)
})