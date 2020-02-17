const _ = require("lodash");
const utils = require("../utils");

const transformBookmarks = bookmarks =>
  bookmarks.map(({ url, title, _id, score }) => ({
    url: _.toString(url),
    title: _.toString(title),
    id: _id,
    score
  }));

module.exports = bookmarks =>
  _.flow([utils.toArray, transformBookmarks])(bookmarks);
