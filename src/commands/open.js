const _ = require("lodash");
const { exec } = require("child_process");
const executeService = require("../services/executor");
const bookmarkService = require("../services/bookmark");

const openHandler = identify => async () => {
  const field = parseInt(identify) || identify;
  const finder = type => {
    const handlers = {
      number: bookmarkService.findBookmarkById,
      string: bookmarkService.findBookmarkByTitle
    };
    return handlers[type];
  };
  const { url } = await finder(typeof field)(field);
  exec(`open ${url}`);
};

module.exports = program => {
  program
    .command("open <identify>")
    .description("Open specific bookmark url by id or title")
    .action(async identify => {
      const handler = openHandler(identify);
      await executeService(handler);
    });
};
