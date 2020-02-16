const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: "Bookmark"
  }, {
    timestamps: true
  }]
});

module.exports = mongoose.model("Category", categorySchema);