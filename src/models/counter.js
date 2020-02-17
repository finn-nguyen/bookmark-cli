const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema(
  {
    _id: { type: String, require: true },
    sequence: {
      type: Number,
      require: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Counter", counterSchema);
