const router = require('express').Router()
const {Multistream} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const streams = await Multistream.findAll({})
    console.log(streams)
    res.json(streams)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    let newStream = await Multistream.create(req.body)
    res.json(newStream)
  } catch (err) {
    next(err)
  }
})
