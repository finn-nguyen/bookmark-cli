const _ = require("lodash");
const executeService = require("../services/executor");
const bookmarkTransformer = require("../transformers/bookmark");
const bookmarkPresenter = require("../presenters/bookmark");
const bookmarkService = require("../services/bookmark");

const updateHandler = (id, title, score, url) => async () => {
  const params = { title, score, url };
  const bookmark = await bookmarkService.updateBookmark(id, params);
  _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmark);
};

module.exports = program => {
  program
    .command("update <id>")
    .option("-t, --title [title]", "bookmark title")
    .option("-s, --score [score]", "bookmark score")
    .option("-u, --url [url]", "bookmark url")
    .description("Update bookmark")
    .action(async (id, { title, score, url }) => {
      const handler = updateHandler(id, title, score, url);
      await executeService(handler);
    });
};
