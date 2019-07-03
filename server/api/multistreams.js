const router = require('express').Router()
const {Multistream} = require('../db/models')

// GET /api/multistreams
router.get('/:userId', async (req, res, next) => {
  try {
    const streams = await Multistream.findAll({
      where: {
        userId: req.params.userId
      }
    })
    console.log(streams)
    res.json(streams)
  } catch (err) {
    next(err)
  }
})

// GET /api/multistreams/multistreamId
router.get('/:multistreamId', async (req, res, next) => {
  try {
    const stream = await Multistream.findByPk(req.params.multistreamId)
    res.json(stream)
  } catch (error) {
    next(error)
  }
})

// add multistream
router.post('/', async (req, res, next) => {
  try {
    let newStream = await Multistream.create(req.body)
    res.json(newStream)
  } catch (err) {
    next(err)
  }
})

// update multistream
router.put('/:multistreamId', async (req, res, next) => {
  try {
    let theMultistream = await Multistream.findByPk(req.params.multistreamId)
    let multistream = await theMultistream.update(req.body)
    res.json(multistream)
  } catch (error) {
    next(error)
  }
})

router.delete('/:multistreamId', async (req, res, next) => {
  try {
    await Multistream.destroy({
      where: {
        id: req.params.multistreamId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
