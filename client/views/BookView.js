var BookView = Backbone.View.extend({

  tagName: 'div',
  className: 'book',
  template: _.template('<div class="book-hits"><%= hits %></div><div class="book-name"><%= name %></div>'),
  
  initialize: function(){
    var self = this;
    this.model.on('change:hits', function(){
      self.render();
    });
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
