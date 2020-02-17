require("./db");
const { exec } = require("child_process");
const killer = require("./services/killer");
const commander = require("commander");
const _ = require("lodash");
const bookmarkTransformer = require("./transformers/bookmark");
const categoryTransformer = require("./transformers/category");
const bookmarkPresenter = require("./presenters/bookmark");
const categoryPresenter = require("./presenters/category");
const bookmarkService = require("./services/bookmark");
const categoryService = require("./services/category");

const program = new commander.Command();

program.version("1.0.0");

program
  .command("list [category]")
  .description("List all categories or bookmark in a category")
  .action(async category => {
    if (category) {
      const bookmarks = await bookmarkService.findByCategoryName(category);
      _.flow([bookmarkTransformer, bookmarkPresenter(console.log)])(bookmarks);
    } else {
      const categories = await bookmarkService.getBookmarksByCategories();
      _.flow([categoryTransformer, categoryPresenter(console.log)])(categories);
    }
    killer.exit();
  });

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

program
  .command("delete <id>")
  .description("Delete bookmark by bookmark id")
  .action(async id => {
    await bookmarkService.deleteBookmark(id);
    killer.exit();
  });

program.parse(process.argv);
