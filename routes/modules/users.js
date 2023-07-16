const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('Login')
})

router.post('/login', (req,res) => {

})
router.get('/register', (req, res) => {
  res.render('Register')
})
router.post('/register', (req,res) => {
  
})

module.exports = router