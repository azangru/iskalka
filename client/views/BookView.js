var BookView = Backbone.View.extend({

  tagName: 'div',
  className: 'book',
  template: _.template('<div class="book-hits"></div><div class="book-name"><%= name %></div>'),
  
  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
