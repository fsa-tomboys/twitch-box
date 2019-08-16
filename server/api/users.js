const router = require('express').Router()
const {User, Multistream} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.post('/time/:userId/:seconds', async (req, res, next) => {
  try {
    let theUser = await User.findByPk(req.params.userId)
    theUser.update({
      time: (theUser.time += Math.round(req.params.seconds))
    })
    res.json('time added to user successfully!')
  } catch (err) {
    next(err)
  }
})
router.get('/time/:userId/', async (req, res, next) => {
  try {
    let theUser = await User.findByPk(req.params.userId)
    res.json(theUser.data.time)
  } catch (err) {
    next(err)
  }
})
router.get('/tft', async (req, res, next) => {
  try {
    res.json('hello')
    console.log(snake)
  } catch (err) {
    next(err)
  }
})
router.post('/association/:userId/:multistreamId', async (req, res, next) => {
  try {
    let theMultistream = await Multistream.findByPk(req.params.multistreamId)
    let theUser = await User.findByPk(req.params.userId)
    await theUser.addMultistream(theMultistream)
    let userToReturn = await User.findByPk(req.params.userId, {
      include: [Multistream]
    })
    res.json(userToReturn)
  } catch (error) {
    next(error)
  }
})
