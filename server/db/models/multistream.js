const Sequelize = require('sequelize')
const db = require('../db')

const Multistream = db.define('multistream', {
  link: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Multistream
