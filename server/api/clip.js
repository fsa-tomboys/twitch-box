const router = require('express').Router()
const {Clip} = require('../db/models')

// getr clips for this user

router.get('/:userId', async (req, res, next) => {
  console.log('userId: ', req.params.userId)
  try {
    const clips = await Clip.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(clips)
  } catch (err) {
    next(err)
  }
})

// add clip
router.post('/', async (req, res, next) => {
  // console.log('Route: ', req.body)
  try {
    let newClip = await Clip.create({
      clips: req.body.newClip,
      userId: req.body.userId,
      name: req.body.clipName
    })
    // console.log('backend in clip ', newClip)
    res.json(newClip)
  } catch (err) {
    next(err)
  }
})

module.exports = router
