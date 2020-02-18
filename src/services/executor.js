const mongoose = require("mongoose");

module.exports = async handler => {
  try {
    await handler();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
};
