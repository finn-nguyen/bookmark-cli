require("./db");
const commander = require("commander");

const program = new commander.Command();

program.version("1.0.0");

program
  .command("list [category]")
  .description("List all categories or bookmark in a category")
  .action(category => {
    console.log({
      category
    });
  });

program
  .command("add <category> <url>")
  .description("Add a new bookmark")
  .action((category, url) => {
    console.log(`${category} ${url}`);
  });

program
  .command("remove <id>")
  .description("Remove bookmark by bookmark id")
  .action(id => {
    console.log({
      id
    });
  });

program.parse(process.argv);