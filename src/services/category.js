const categoryDAO = require("../daos/category");
const counterService = require("./counter");

module.exports.createCategory = async ({ name }) =>
  categoryDAO.create({
    name,
    _id: await counterService.nextCategorySequence()
  });

module.exports.findAllCategories = () => categoryDAO.findAll();

module.exports.findByCategoryName = name => categoryDAO.findByName(name);

module.exports.findByCategoryId = id => categoryDAO.findById(id);

module.exports.findOrCreate = async name => {
  let category = await categoryDAO.findByName(name);
  if (!category) {
    category = await categoryDAO.create({
      name,
      _id: await counterService.nextCategorySequence()
    });
  }
  console.log({ category });
  return category;
};
