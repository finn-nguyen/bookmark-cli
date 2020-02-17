const Table = require("cli-table");

const table = new Table({
  head: ["ID", "Category", "Bookmarks"]
});

module.exports = categories => {
  categories.forEach(category => {
    const { name, bookmarks, id } = category;
    table.push([id, name, bookmarks]);
  });
  return table.toString();
};
