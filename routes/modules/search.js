const express = require('express')
const router =express.Router()
const Restaurant = require('../../models/restaurant')

//Search-bar
router.get('/', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.toLowerCase().trim()
  //看關鍵字是否包含在類別、餐廳中英名稱內
  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const filteredRestaurants = restaurantsData.filter(
        ({ name, name_en, category }) =>
          name.toLowerCase().includes(keyword) ||
          name_en.toLowerCase().includes(keyword) ||
          category.includes(keyword)
      )
      //Use condition operator to render corresponding 
      const renderPage = filteredRestaurants.length === 0 ? 'nosearchresult' : 'index'
      return res.render(renderPage, { restaurants: filteredRestaurants, keywords })
    })
    .catch(err => console.log(err))
})

module.exports = router