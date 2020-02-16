const Table = require("cli-table")

const table = new Table({
  head: ['', 'Title', 'URL'],
})

module.exports = (bookmarks) => {
  bookmarks.forEach((bookmark, index) => {
    const {
      title,
      url
    } = bookmark
    table.push([index + 1, title, url])
  })
  return table.toString()
}