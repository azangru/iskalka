var csv = require('csv');
var fs = require('fs');
var path = require("path");
var lineReader = require('line-reader');
var models = require("../models");
var elasticsearch = require('./elastic.js');

models.sequelize.sync().then(function () {
  
  // declare Sequelize models
  var Book = models.Book;
  var Paragraph = models.Paragraph;

  // read the csv file with a list of books
  var books = fs.readFileSync(path.join(__dirname, 'initial_texts', 'book-list.csv'));

  // parse the list of books
  csv.parse(books, function(err, data){
    // on callback, import books
    importBooks(data);
  });

  var importBooks = function(books){
    // books is an array of arrays of the following structure:
    // ["Book Name", book_file]
    books.forEach(function(book){
      var bookName = book[0];
      var bookPath = path.join(__dirname, 'initial_texts', book[1]);
      Book.create({name: bookName})
        .then(function(book){
          readParagraphs(book, bookPath);
        });
    });
  };

  var readParagraphs = function(book, bookPath){
    lineReader.eachLine(bookPath, function(line, last) {
      var left, right;
      var paragraph = {};
      if(line.length === 0){
        return;
      }
      if (line.match(/\t/)){
        left = /(.*)\t/.exec(line);
        right = /\t(.*)/.exec(line);
        paragraph.left = left[1].replace("@", "\n");
        paragraph.right = right[1].replace("@", "\n");
      } else {
        left = line;
        paragraph.left = left;
      }
      paragraph.BookId = book.id;
      var newParagraph = Paragraph.create(paragraph)
        .then(function(newParagraph){
          elasticsearch.create(newParagraph);
        });
      
      // Paragraph.create(paragraph).then(function(newParagraph){
      //   return newParagraph.setBook(book);
      // });
    });
  };
});
