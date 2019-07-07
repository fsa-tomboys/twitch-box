const Sequelize = require('sequelize')
const db = require('../db')

const Clip = db.define('clip', {
  clips: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Clip
