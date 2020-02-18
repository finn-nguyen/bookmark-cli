const _ = require("lodash");
const bookmarkTransformer = require("../transformers/bookmark");
const bookmarkPresenter = require("../presenters/bookmark");
const bookmarkService = require("../services/bookmark");
const categoryService = require("../services/category");
const executeService = require("../services/executor");

const addHandler = (categoryName, url, score, title) => async () => {
  const category = await categoryService.findOrCreate(categoryName);
  const bookmark = await bookmarkService.createBookmark({
    category: category.id,
    url,
    title,
    score
  });
  _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmark);
};

module.exports = program => {
  program
    .command("add <category_name> <url>")
    .option("-s, --score <score>", "bookmark score")
    .option("-t, --title [title]", "bookmark title")
    .description("Add a new bookmark")
    .action(async (category_name, url, { score = 0, title = "" }) => {
      const handler = addHandler(category_name, url, score, title);
      await executeService(handler);
    });
};
