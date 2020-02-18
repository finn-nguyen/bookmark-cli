const _ = require("lodash");
const killer = require("../services/killer");
const bookmarkTransformer = require("../transformers/bookmark");
const bookmarkPresenter = require("../presenters/bookmark");
const bookmarkService = require("../services/bookmark");

module.exports = program => {
  program
    .command("update <id>")
    .option("-t, --title [title]", "bookmark title")
    .option("-s, --score [score]", "bookmark score")
    .option("-u, --url [url]", "bookmark url")
    .description("Update bookmark")
    .action(async (id, { title, score, url }) => {
      const params = { title, score, url };
      const bookmark = await bookmarkService.updateBookmark(id, params);
      _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmark);
      killer.exit();
    });
};
