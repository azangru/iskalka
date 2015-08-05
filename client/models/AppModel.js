var AppModel = Backbone.Model.extend({

  initialize: function(params){
    var self = this;
    this.set('books', new Books(params));
    this.set('paragraph', new ParagraphModel());
    this.set('search', new SearchModel());
 
    this.get('search').on('received response to query', function(booksWithIds, firstParagraph){
      // responds 4 times; will need to fix
      booksWithIds.forEach(function(bookWithIds){
        var bookId = _.keys(bookWithIds)[0];
        var book = self.get('books').findWhere({bookId: parseInt(bookId)});
        book.set("paragraphIds", bookWithIds[bookId]);
      });
      var paragraph = self.get('paragraph');
      paragraph.set({
        paragraphId: firstParagraph.id,
        leftText: firstParagraph.left,
        rightText: firstParagraph.right
      });
      console.log(firstParagraph);
    });
 }

});
