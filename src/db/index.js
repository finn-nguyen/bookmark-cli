const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/bookmarks")
  .then(() => console.log("Database connection successfully"))
  .catch(err => console.error("Database connection error"));
