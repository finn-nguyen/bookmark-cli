const _ = require("lodash");
const { exec } = require("child_process");
const killer = require("../services/killer");
const bookmarkService = require("../services/bookmark");

module.exports = program => {
  program
    .command("open <identify>")
    .description("Open specific bookmark url by id or title")
    .action(async identify => {
      try {
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
      } finally {
        killer.exit();
      }
    });
};
