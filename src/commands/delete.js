const _ = require("lodash");
const killer = require("../services/killer");
const bookmarkService = require("../services/bookmark");

module.exports = program => {
  program
    .command("delete <id>")
    .description("Delete bookmark by bookmark id")
    .action(async id => {
      await bookmarkService.deleteBookmark(id);
      killer.exit();
    });
};
