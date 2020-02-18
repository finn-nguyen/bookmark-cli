const _ = require("lodash");
const killer = require("../services/killer");
const bookmarkTransformer = require("../transformers/bookmark");
const bookmarkPresenter = require("../presenters/bookmark");
const bookmarkService = require("../services/bookmark");
const categoryService = require("../services/category");

module.exports = program => {
  program
    .command("add <category_name> <url>")
    .option("-s, --score <score>", "bookmark score")
    .option("-t, --title [title]", "bookmark title")
    .description("Add a new bookmark")
    .action(async (category_name, url, { score = 0, title = "" }) => {
      const category = await categoryService.findOrCreate(category_name);
      const bookmark = await bookmarkService.createBookmark({
        category: category.id,
        url,
        title,
        score
      });
      _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmark);
      killer.exit();
    });
};
