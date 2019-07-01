const router = require('express').Router()
module.exports = router
const TwitchClient = require('twitch').default

// GET a user infomation based on the userid
router.get('/:userId', async (req, res, next) => {
  try {
    let client = await TwitchClient.withClientCredentials(
      process.env.TWITCH_CLIENT_ID,
      process.env.TWITCH_CLIENT_SECRET
    )
    let theUser = await client.kraken.users.getUser(req.params.userId)
    // console.log('theUser: ', theUser)
    // console.log('id: ', theUser.id)
    // console.log('typeof id: ', typeof theUser.id)
    // let channels = await client.kraken.users.getFollowedChannels(theUser.id)
    // console.log('channels: ', channels)
    res.json(theUser._data)
  } catch (err) {
    next(err)
  }
})

// Get a list of channels a given user follows, as well as an array of channels' on/offline status
router.get('/channels/:userId', async (req, res, next) => {
  try {
    let client = await TwitchClient.withClientCredentials(
      process.env.TWITCH_CLIENT_ID,
      process.env.TWITCH_CLIENT_SECRET
    )
    let channels = await client.kraken.users.getFollowedChannels(
      req.params.userId
    )
    // get a acompanied array showing if the stream of the channel is alive
    let isOnline = []
    for (let channel of channels) {
      let theStream = await client.kraken.streams.getStreamByChannel(
        channel._data.channel._id
      )
      // console.log('theStream: ', theStream)
      if (theStream) isOnline.push(true)
      else isOnline.push(false)
    }
    // console.log('isAlive array: ', isOnline)
    // console.log('channels: ', channels)
    res.json({channels, isOnline})
  } catch (err) {
    next(err)
  }
})
