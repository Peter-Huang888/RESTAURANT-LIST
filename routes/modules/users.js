const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  const userInput = req.session.userInput || {}
  delete req.session.userInput
  const login_error_msg = req.flash('error')
  return res.render('login', {
    login_error_msg,
    email: userInput.email,
  })
})

router.post('/login', (req, res, next) => {
  req.session.userInput = req.body
  next()
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true //將錯誤訊息存到req.flash('error')裡面
}))

router.get('/register', (req, res) => {
  res.render('Register')
})

router.post('/register', (req, res) => {
  //取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  const register_error_messages = []
  if (!email || !password || !confirmPassword) {
    register_error_messages.push({ message: '*選項都是必填！' })
  }
  if (password !== confirmPassword) {
    register_error_messages.push({ message: '密碼與確認密碼不相符！' })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        register_error_messages.push({ message: '這個Email已經被註冊過了！' })
      }
      if (register_error_messages.length) {
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          register_error_messages
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    req.flash('logout_success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

module.exports = router