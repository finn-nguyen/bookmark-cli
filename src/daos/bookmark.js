const Bookmark = require("../models/bookmark");

module.exports.create = ({ type, category, url, title, _id, score }) =>
  Bookmark.create({
    score,
    type,
    category,
    url,
    title,
    _id
  });

module.exports.findAll = () => Bookmark.find().sort({ score: 1 });

module.exports.findByTitle = title =>
  Bookmark.findOne({
    title
  });

module.exports.findById = id => Bookmark.findOne({ _id: id });

module.exports.findByCategoryId = category => {
  return Bookmark.find({
    category
  }).sort({ score: 1 });
};

module.exports.deleteBookmark = id => Bookmark.deleteOne({ _id: id });
