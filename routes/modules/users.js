const express = require('express')
const router = express.Router()
const User = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('Login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (user && password === user.password) return res.redirect('/')
      console.log('Email 或 密碼輸入錯誤')
      return res.redirect('/users/login')
    })
    .catch(err => console.log(err))
})
router.get('/register', (req, res) => {
  res.render('Register')
})
router.post('/register', (req, res) => {
  //取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router