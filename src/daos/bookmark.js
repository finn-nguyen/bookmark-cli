const Bookmark = require('../models/bookmark')

module.exports.create = ({
    type,
    category,
    url,
    title
  }) =>
  Bookmark.create({
    type,
    category,
    url,
    title
  });

module.exports.findAll = () => Bookmark.find();

module.exports.findByTitle = title =>
  Bookmark.findOne({
    title
  });

module.exports.findByCategoryId = category => {
  return Bookmark.findOne({
    category
  })
};