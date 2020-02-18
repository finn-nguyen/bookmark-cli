const _ = require("lodash");
const executeService = require("../services/executor");
const bookmarkTransformer = require("../transformers/bookmark");
const categoryTransformer = require("../transformers/category");
const bookmarkPresenter = require("../presenters/bookmark");
const categoryPresenter = require("../presenters/category");
const bookmarkService = require("../services/bookmark");

const listHandler = category => async () => {
  const defaultHandler = async () => {
    const categories = await bookmarkService.getBookmarksByCategories();
    _.flow([categoryTransformer, categoryPresenter(console.log)])(categories);
  };
  const handlers = {
    string: async () => {
      const bookmarks = await bookmarkService.findByCategoryName(category);
      _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmarks);
    }
  };
  const handler = handlers[typeof category] || defaultHandler;
  await handler();
};

module.exports = program => {
  program
    .command("list [category]")
    .description("List all categories or bookmark in a category")
    .action(async category => {
      const handler = listHandler(category);
      await executeService(handler);
    });
};