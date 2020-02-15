const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: "Bookmark"
  }]
});

const Category = mongoose.model("Category", categorySchema);

module.exports.create = ({
  name
}) => Category.create({
  name
})

module.exports.findAll = () => Category.find()

module.exports.findByName = (name) => Category.find({
  name
})

module.exports.findById = (id) => Category.find({
  _id: id
})