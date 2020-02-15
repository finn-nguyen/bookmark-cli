const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    require: false
  },
  url: {
    type: String,
    require: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports.create = ({
  type,
  category,
  url
}) => Bookmark.create({
  type,
  category,
  url
})

module.exports.findAll = () => Bookmark.find()

module.exports.findByTitle = (title) => Bookmark.find({
  title
})

module.exports.findByCategory = (category) => {
  return Bookmark.find().populate('bookmarks', null, {
    name: category
  })
}