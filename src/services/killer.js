const mongoose = require('mongoose')

module.exports.exit = () => {
  mongoose.disconnect()
  process.exit()
}