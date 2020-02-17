const Table = require("cli-table");

const table = new Table({
  head: ["ID", "Title", "Score", "URL"]
});

module.exports = bookmarks => {
  bookmarks.forEach(bookmark => {
    const { title, url, id, score } = bookmark;
    table.push([id, title, score, url]);
  });
  return table.toString();
};
