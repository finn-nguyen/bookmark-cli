const _ = require("lodash");
const bookmarkService = require("../services/bookmark");
const executeService = require("../services/executor");

const deleteHandler = id => async () => {
  await bookmarkService.deleteBookmark(id);
};

module.exports = program => {
  program
    .command("delete <id>")
    .description("Delete bookmark by bookmark id")
    .action(async id => {
      const handler = deleteHandler(id);
      await executeService(handler);
    });
};
