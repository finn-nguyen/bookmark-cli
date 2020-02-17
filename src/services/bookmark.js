const bookmarkDAO = require("../daos/bookmark");
const categoryService = require("./category");
const counterService = require("./counter");

module.exports.createBookmark = async ({ type, category, url, title, score }) =>
  bookmarkDAO.create({
    score,
    type,
    category,
    url,
    title,
    _id: await counterService.nextBookmarkSequence()
  });

module.exports.findAllBookmarks = () => bookmarkDAO.findAll();

module.exports.findBookmarkByTitle = title => bookmarkDAO.findByTitle(title);

module.exports.findBookmarkById = id => bookmarkDAO.findById(id);

module.exports.findByCategoryId = id => bookmarkDAO.findByCategoryId(id);

module.exports.findByCategoryName = async name => {
  const category = await categoryService.findByCategoryName(name);
  return bookmarkDAO.findByCategoryId(category.id);
};

module.exports.getBookmarksByCategories = async () => {
  const categories = await categoryService.findAllCategories();
  const result = [];
  for (let category of categories) {
    const bookmarks = await bookmarkDAO.findByCategoryId(category._id);
    result.push({
      _id: category._id,
      name: category.name,
      bookmarks
    });
  }
  return result;
};

module.exports.scoreBookmark = async (id, score) => {
  const bookmark = await bookmarkDAO.findById(id);
  bookmark.score = score;
  await bookmark.save();
};

module.exports.deleteBookmark = async id => {
  await bookmarkDAO.deleteBookmark(id);
};
