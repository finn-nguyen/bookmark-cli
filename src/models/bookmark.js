const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    url: {
      type: String,
      require: true
    },
    category: {
      type: Number,
      ref: "Category",
      require: true
    },
    _id: Number,
    score: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
