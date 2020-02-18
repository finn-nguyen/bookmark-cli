# Bookmark CLI

## Installation

### List all categories
List all categories or all bookmark in a category
```
bookmark list
bookmark list golang
```
##### Usage
```
bookmark list [category]
```
If category is missing it will list all categories.

### Add a new bookmark
Add a new bookmark in a category.
```
bookmark add golang http://golang.org -t golang -s 100
```
##### Usage
```
bookmark add <category> <url> -t title -s score

Options:
-t, --title [title]    bookmark title
-s, --score [score]    bookmark score for ranking
```

### Open a bookmark
Open a bookmark by title or id
```
bookmark open 1
bookmark open golang
```

### Update a bookmark
Update title, url, score of a bookmark by id
```
bookmark update 1 -t golang -u http://golang.org -s 25
```
##### Usage
```
bookmark update <id> -t [title] -u [url] -s [score]

Options:
-t, --title [title]    bookmark title
-s, --score [score]    bookmark score for ranking
-u, --url [url]        bookmark url
```

### Delete a bookmark
Delete a bookmark by id
```
bookmark delete 2
```


