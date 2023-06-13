const mongoose = require('mongoose') //載入mongoose
const Restaurant = require('../restaurant.js') //載入 restaurant model
const restaurant = require('../../restaurant.json').results

// 如果在非正式環境下，載入dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection //取得資料庫連線狀態
// 連線失敗
db.on('error', () => {
  console.log('mongoDB error!')
})

// 連線成功
db.once('open', () => {
  console.log('running restaurantSeeder script...')
  Restaurant.create(restaurant)
  .then(() => {
    console.log('restaurantSeeder done!')
    db.close
  })
  .catch(err => console.log(err))
})

