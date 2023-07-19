const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('Login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
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
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {return next(err)}
    res.redirect('/users/login')
  })
})

module.exports = router