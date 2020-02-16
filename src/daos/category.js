const Category = require('../models/category')

module.exports.create = ({
    name
  }) =>
  Category.create({
    name
  });

module.exports.findAll = () => Category.find({});

module.exports.findByName = name =>
  Category.findOne({
    name
  });

module.exports.findById = id =>
  Category.findOne({
    _id: id
  });

module.exports.findOrCreate = async (name) => {
  let category = await Category.findOne({
    name
  })
  if (!category) {
    category = await Category.create({
      name
    })
  }
  return category
}