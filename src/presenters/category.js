const Table = require("cli-table")

const table = new Table({
  head: ['', 'Category', 'Bookmarks'],
})

module.exports = (categories) => {
  categories.forEach((category, index) => {
    const {
      name,
      bookmarks
    } = category
    table.push([index + 1, name, bookmarks])
  })
  return table.toString()
}