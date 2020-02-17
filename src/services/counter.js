const counterDAO = require("../daos/counter");

const nextSequence = async id => {
  const counter = await counterDAO.findOrCreate(id);
  const sequence = counter.sequence;
  counter.sequence = sequence + 1;
  await counter.save();
  return sequence;
};

module.exports.nextBookmarkSequence = () => nextSequence("bookmark");

module.exports.nextCategorySequence = () => nextSequence("category");
