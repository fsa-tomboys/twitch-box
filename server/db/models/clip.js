const Sequelize = require('sequelize')
const db = require('../db')

const Clip = db.define('clip', {
  clips: {
    type: Sequelize.STRING
  }
})

module.exports = Clip
