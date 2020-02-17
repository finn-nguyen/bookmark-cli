const Bookmark = require("../models/bookmark");

module.exports.create = ({ type, category, url, title, _id }) =>
  Bookmark.create({
    type,
    category,
    url,
    title,
    _id
  });

module.exports.findAll = () => Bookmark.find();

module.exports.findByTitle = title =>
  Bookmark.findOne({
    title
  });

module.exports.findByCategoryId = category => {
  return Bookmark.find({
    category
  });
};
