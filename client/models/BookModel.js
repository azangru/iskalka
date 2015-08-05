var BookModel = Backbone.Model.extend({

  initialize: function(){
    var self = this;
    this.set("hits", "");
    this.on('change', function(){
      var numberOfHits = self.get("paragraphIds").length;
      self.set("hits", numberOfHits);
    });
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

});
