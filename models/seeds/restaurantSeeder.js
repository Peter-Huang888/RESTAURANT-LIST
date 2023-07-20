const restaurants = require('../../restaurant.json').results
const Restaurant = require('../restaurant.js') //載入 restaurant model
const User = require('../users.js')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const seedUser1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}
const seedUser2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

// 連線成功
db.once('open', () => {
  console.log('running restaurantSeeder script...')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seedUser1.password, salt))
    .then(hash => {
      [seedUser1.password, seedUser2.password] = [hash, hash] //將 hash 重新指定給password
      return User.create([seedUser1, seedUser2]) //一次新增兩個使用者
        .then(users => {
          const [user1Id, user2Id] = [users[0]._id, users[1]._id] //取得各自的userId
          return Promise.all(
            //創建seedUser1的餐廳
            Array.from({ length: 3 }, (_, i) => {
              const restaurant = restaurants[i] //取得restaurant物件
              restaurant.userId = user1Id //將restaurant物件加上userId屬性
              return Restaurant.create(restaurant)
              //透過concat()串起陣列，創建seedUser2的餐廳清單
            }).concat(Array.from({ length: 3 }, (_, i) => {
              const restaurant = restaurants[i + 3]
              restaurant.userId = user2Id
              return Restaurant.create(restaurant)
            })))
        })
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})