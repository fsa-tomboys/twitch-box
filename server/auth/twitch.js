const passport = require('passport')
const router = require('express').Router()
const twitchStrategy = require('passport-twitch').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
  console.log('TWITCH client ID / secret not found. Skipping TWITCH OAuth.')
} else {
  const twitchConfig = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: process.env.TWITCH_CALLBACK,
    scope: ['user_read', 'channel_read', 'clips:edit']
  }

  const strategy = new twitchStrategy(
    twitchConfig,
    (token, refreshToken, profile, done) => {
      const name = profile.displayName
      User.findOrCreate({
        where: {twitchId: profile.id},
        defaults: {name, token, refreshToken}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('twitch'))

  router.get(
    '/callback',
    passport.authenticate('twitch', {
      successRedirect: '/featured',
      failureRedirect: '/login'
    })
  )
}
