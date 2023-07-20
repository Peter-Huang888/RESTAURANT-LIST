const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')
module.exports = app => {
  //Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())
  //Setting local-strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '這個Email還沒有註冊過' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) { return done(null, false, { message: '輸入的密碼或Email錯誤' }) }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  //Setting serialize/deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
