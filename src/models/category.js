const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    _id: String,
    name: {
      type: String,
      require: true
    },
    bookmarks: [
      {
        type: Number,
        ref: "Bookmark"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Category", categorySchema);
