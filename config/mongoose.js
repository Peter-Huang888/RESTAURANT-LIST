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

module.exports = db