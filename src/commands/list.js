const _ = require("lodash");
const killer = require("../services/killer");
const bookmarkTransformer = require("../transformers/bookmark");
const categoryTransformer = require("../transformers/category");
const bookmarkPresenter = require("../presenters/bookmark");
const categoryPresenter = require("../presenters/category");
const bookmarkService = require("../services/bookmark");

module.exports = program => {
  program
    .command("list [category]")
    .description("List all categories or bookmark in a category")
    .action(async category => {
      if (category) {
        const bookmarks = await bookmarkService.findByCategoryName(category);
        _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(
          bookmarks
        );
      } else {
        const categories = await bookmarkService.getBookmarksByCategories();
        _.flow([categoryTransformer, categoryPresenter(console.log)])(
          categories
        );
      }
      killer.exit();
    });
};
