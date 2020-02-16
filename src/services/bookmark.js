const bookmarkDAO = require('../daos/bookmark')
const categoryService = require('./category')

module.exports.createBookmark = ({
  type,
  category,
  url,
  title
}) => bookmarkDAO.create({
  type,
  category,
  url,
  title
})

module.exports.findAllBookmarks = () => bookmarkDAO.findAll();

module.exports.findBookmarkByTitle = (title) => bookmarkDAO.findByTitle(title)

module.exports.findByCategoryId = (id) => bookmarkDAO.findByCategoryId(id)

module.exports.findByCategoryName = async (name) => {
  const category = await categoryService.findByCategoryName(name)
  return bookmarkDAO.findByCategoryId(category.id)
}