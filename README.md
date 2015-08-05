# Iskalka #

This project is a searcheable database for bilingual texts.

## Useful commands

- List indices of elasticsearch: `curl 'localhost:9200/_cat/indices?v'`
- Delete elasticsearch index of my database: `curl -XDELETE 'http://localhost:9200/iskalka/'`

## TODO

- handle empty responses on the server
- create a "rank" field for books; books should eventually be ranked by user
(as a further option, different users can have different lists of books and different ranking of books)
- rely on the book's rank to return the text of the first paragraph (the first paragraph to be sent to the client should be the first found paragraph of the highest-ranked book (=> a paragraph with the lowest id among the paragraphs belonging to the highest-ranked book)

## REFERENCES
- elasticsearch API: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
- elasticsearch index API: https://www.elastic.co/guide/en/elasticsearch/reference/1.6/docs-index_.html
- example of Sequelize use with Express.js: https://github.com/sequelize/express-example
