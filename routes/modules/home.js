const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

const sortMethod = [{ _id: 'asc' }, { name: 'asc' }, { name: 'desc' }, { category: 'asc' }, { rating: 'desc' }, { rating: 'asc' }]

//Render index page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({_id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
})

router.get('/search', (req, res) => {
  // if (!req.query.keywords) {
  //   return res.redirect('/')
  // }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.toLowerCase().trim()
  const sort = Number(req.query.sort)
  //看關鍵字是否包含在類別、餐廳中英名稱內
  Restaurant.find()
    .lean()
    .sort(sortMethod[sort])
    .then(restaurantsData => {
      const filteredRestaurants = restaurantsData.filter(
        ({ name, name_en, category }) =>
          name.toLowerCase().includes(keyword) ||
          name_en.toLowerCase().includes(keyword) ||
          category.includes(keyword)
      )
      //Use condition operator to render corresponding 
      const renderPage = filteredRestaurants.length === 0 ? 'nosearchresult' : 'index'
      return res.render(renderPage, { restaurants: filteredRestaurants, keywords, sort })
    })
    .catch(err => console.log(err))
})

module.exports = router