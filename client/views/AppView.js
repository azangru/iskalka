var AppView = Backbone.View.extend({

  initialize: function(params){
    this.searchView = new SearchView({model: this.model.get('search')});
    this.booksView = new BooksView({collection: this.model.get('books')});
    this.paragraphView = new ParagraphView({model: this.model.get('paragraph')});

    // this.model.on('change:currentSong', function(model){
    //   this.playerView.setSong(model.get('currentSong'));
    // }, this);

    // this.playerView.model.on('ended', function(song){
    //   var queue = this.songQueueView.collection;
    //   queue.at(0).ended();
    //   // queue.remove(queue.at(0));
    //   // if (queue.length > 0) {
    //   //   queue.playFirst();
    //   // }
    // }, this);
  },

  render: function(){
    return $('body').html([
      this.searchView.$el,
      this.booksView.$el,
      this.paragraphView.$el
    ]);
  }

});
