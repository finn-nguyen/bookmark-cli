const _ = require('lodash')
const utils = require('../utils')

const transformBookmarks = (bookmarks) => bookmarks.map(({
  url,
  title
}) => ({
  url: _.toString(url),
  title: _.toString(title)
}))


module.exports = (bookmarks) => _.flow([utils.toArray, transformBookmarks])(bookmarks)