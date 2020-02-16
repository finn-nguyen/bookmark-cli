const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
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
    ref: "Category",
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);