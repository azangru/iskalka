var lineReader = require('line-reader');
var models = require("../models");

models.sequelize.sync().then(function () {
  // start doing magic

  var Paragraph = models.Paragraph;

  lineReader.eachLine('./initial_texts/test.txt', function(line, last) {
    // console.log(line);
    if (line.match(/\t/)){
      var left = /(.*)\t/.exec(line);
      var right = /\t(.*)/.exec(line);
      var paragraph = {};
      Paragraph.create({
        left: left[1].replace("@", "\n"),
        right: right[1].replace("@", "\n")
      });
      // paragraph.left = left[1].replace("@", "\n");
      // console.log(paragraph.left);
    }

    // if (/* done */) {
    //   return false; // stop reading
    // }
  });
 
});


