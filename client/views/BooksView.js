var BooksView = Backbone.View.extend({

  tagName: 'div',
  className: 'book-list',

  initialize: function() {
    this.render();
  },

  render: function(){
    // preserve event handlers on child nodes
    this.$el.children().detach();
    this.$el.append(
      this.collection.map(function(book){
        return new BookView({model: book}).render();
      })
    );
  }

});
