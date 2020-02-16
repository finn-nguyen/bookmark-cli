const _ = require('lodash')
const utils = require('../utils')

const transformCategory = (categories) => categories.map(({
  name,
  bookmarks
}) => ({
  name: _.toString(name),
  bookmarks: bookmarks.length
}))

module.exports = (categories) => _.flow([utils.toArray, transformCategory])(categories)