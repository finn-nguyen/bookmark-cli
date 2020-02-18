const Counter = require("../../models/counter");

module.exports.create = id => Counter.create({
  _id: id
});

module.exports.findOrCreate = async id => {
  let counter = await Counter.findOne({
    _id: id
  });
  if (!counter) {
    counter = await Counter.create({
      _id: id
    });
  }
  return counter;
};

module.exports.sequence = id => Counter.findOne({
  _id: id
}).select("sequence");