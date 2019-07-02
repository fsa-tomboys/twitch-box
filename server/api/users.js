const router = require('express').Router()
const {User, Multistream} = require('../db/models')
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
