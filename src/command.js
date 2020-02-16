require("./db");
const {
  exec
} = require("child_process");
const killer = require('./services/killer')
const commander = require("commander");
const _ = require('lodash')
const bookmarkTransformer = require('./transformers/bookmark')
const categoryTransformer = require('./transformers/category')
const bookmarkPresenter = require('./presenters/bookmark')
const categoryPresenter = require('./presenters/category')
const bookmarkService = require('./services/bookmark')
const categoryService = require('./services/category')

const program = new commander.Command();

program.version("1.0.0");

program
  .command("list [category]")
  .description("List all categories or bookmark in a category")
  .action(async category => {
    if (category) {
      const bookmarks = await bookmarkService.findByCategoryName(category)
      const result = _.flow([bookmarkTransformer, bookmarkPresenter])(bookmarks)
      console.log(result)
    } else {
      const categories = await bookmarkService.getBookmarksByCategories()
      const result = _.flow([categoryTransformer, categoryPresenter])(categories)
      console.log(result)
    }
    killer.exit()
  });

program
  .command("add <category_name> <url> [title]")
  .description("Add a new bookmark")
  .action(async (category_name, url, title) => {
    const category = await categoryService.findOrCreate(category_name)
    const bookmark = await bookmarkService.createBookmark({
      category: category.id,
      url,
      title
    })
    const result = _.flow([bookmarkTransformer, bookmarkPresenter])(bookmark)
    console.log(result)
    killer.exit()
  });

program.command("open <title>")
  .description("Open specific bookmark url")
  .action(async (title) => {
    try {
      const {
        url
      } = await bookmarkService.findBookmarkByTitle(title)
      exec(`open ${url}`)
    } finally {
      killer.exit()
    }
  })

program
  .command("remove <id>")
  .description("Remove bookmark by bookmark id")
  .action(id => {
    console.log({
      id
    });
  });

program.parse(process.argv);