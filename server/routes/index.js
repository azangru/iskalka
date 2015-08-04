var express = require('express');
var _ = require('underscore');
var router  = express.Router();
var models  = require('../models');
var elasticsearch = require('../db/elastic.js');

var Book = models.Book;
var Paragraph = models.Paragraph;

router.get('/', function(req, res) {
  Book.findAll()
    .then(function(books){
      var result = books.map(function(book){
        return {id: book.get('id'), name: book.get('name')};
      });
      console.log("books:", result);
      res.render('index', {books: result});
    });
});

router.get('/find', function(req, res) {
  var query = req.query;
  elasticsearch.search(query.query)
    .then(function (body) {
      var hits = body.hits.hits; // an array of objects
      // console.log("hits:", hits);
      var ids = hits.map(function(record){
        return record._id;
      });
      getParagraphs(ids).then(function(paragraphs){
        console.log("retrieved paragraphs:", paragraphs);
        var response = prepareResponse(paragraphs);
        res.send(response);
      });
    }, function (error) {
      console.trace(error.message);
    });
});

var getParagraphs = function(ids){
  return Paragraph.findAll({
    where: {
      id: {
        in: ids
      }
    }
  }).then(function(paragraphs){
    return paragraphs;
  });
};


// 1) retrieve ids (elasticsearch) and paragraphs (from db)
// 2) create an array of objects [{bookId: ..., paragraphIds: ...}]
// 3) get the book with the smallest id
// 4) in that book, get the paragraph with the smallest id
// 5) return the object {foundBooks: [array from (2)], firstParagraph: {left, right}}
var prepareResponse = function(paragraphs){
  var idMap = paragraphs.map(function(paragraph){
    return {paragraphId: paragraph.id, bookId: paragraph.BookId};
  });
  var bookIds = _.uniq(_.pluck(idMap, 'bookId')).sort();
  var booksWithParagraphIds = _.chain(bookIds).map(function(bookId){
    var paragraphIds = _.chain(idMap)
      .where({bookId: bookId})
      .pluck('paragraphId')
      .sort()
      .value();
    var result = {};
    result[bookId] = paragraphIds;
    return result;
  }).value();
  // id of the first paragraph is the first paragraph id of the first book id
  var firstParagraphId = booksWithParagraphIds[0][bookIds[0]][0];
  var firstParagraph = _.find(paragraphs, function(paragraph){
    return paragraph.id === firstParagraphId;
  });
  firstParagraph = {id: firstParagraph.id, left: firstParagraph.left, right: firstParagraph.right};
  var result = {foundBooks: booksWithParagraphIds, firstParagraph: firstParagraph};
  return result;
};


module.exports = router;


/* ===== EXAMPLE =====

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

*/

