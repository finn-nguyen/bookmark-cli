const categoryDAO = require('../daos/category')

module.exports.createCategory = ({
  name
}) => categoryDAO.create({
  name
})

module.exports.findAllCategories = () => categoryDAO.findAll()

module.exports.findByCategoryName = (name) => categoryDAO.findByName(name)

module.exports.findByCategoryId = (id) => categoryDAO.findById(id)

module.exports.findOrCreate = (name) => categoryDAO.findOrCreate(name)