const router = require('express').Router()
const {Clip} = require('../db/models')

// add clip
router.post('/', async (req, res, next) => {
  console.log('Route: ', req.body)
  try {
    let newClip = await Clip.create({
      clips: req.body.newClip,
      userId: req.body.userId
    })
    console.log('backend in clip ', newClip)
    res.json(newClip)
  } catch (err) {
    next(err)
  }
})

module.exports = router
