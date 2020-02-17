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
      const result = _.flow([bookmarkTransformer, bookmarkPresenter])(
        bookmarks
      );
      console.log(result);
    } else {
      const categories = await bookmarkService.getBookmarksByCategories();
      const result = _.flow([categoryTransformer, categoryPresenter])(
        categories
      );
      console.log(result);
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
    const result = _.flow([bookmarkTransformer, bookmarkPresenter])(bookmark);
    console.log(result);
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
  .command("score <id> <score>")
  .description("Score bookmark")
  .action(async (id, score) => {
    await bookmarkService.scoreBookmark(id, score);
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
