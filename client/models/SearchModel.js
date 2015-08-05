var SearchModel = Backbone.Model.extend({

  announceResponse: function(data){
    var books = data.foundBooks;
    var firstParagraph = data.firstParagraph;
    this.trigger('received response to query', books, firstParagraph);
  }

});
