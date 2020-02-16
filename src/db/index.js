const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/bookmarks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })