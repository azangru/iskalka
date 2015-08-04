var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('books', new Books(params));
  }

});
