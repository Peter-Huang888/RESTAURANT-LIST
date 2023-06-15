const Restaurant = require('../restaurant.js') //載入 restaurant model
const restaurant = require('../../restaurant.json').results

const db =require('../../config/mongoose.js')
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

