const router = require('express').Router()
const User = require('../db/models/user')
const axios = require('axios')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.get('/refresh', async (req, res, next) => {
  try {
    if (req.user) {
      let response = await axios.post(
        `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${
          req.user.refreshToken
        }&client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${
          process.env.TWITCH_CLIENT_SECRET
        }`
      )
      console.log('res.data for refresh: ', response.data)
      let theUser = await User.findByPk(String(req.user.id))
      // update database for the user
      let user = await theUser.update({
        token: response.data.access_token,
        refreshToken: response.data.refresh_token
      })
      // // update req.user
      req.user.token = response.data.access_token
      req.user.refreshToken = response.data.refresh_token
      // send back, to update store for the user
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))
router.use('/twitch', require('./twitch'))
