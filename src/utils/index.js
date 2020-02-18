const _ = require("lodash");

module.exports.toArray = items => {
  if (!_.isArray(items) && !_.isEmpty(items)) {
    return [items];
  }
  return items;
};
