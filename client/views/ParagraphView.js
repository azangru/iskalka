var ParagraphView = Backbone.View.extend({

  tagName: 'div',
  id: 'paragraph',
  template: _.template('<div class="paragraph-left"><%= leftText %></div><div class="paragraph-right"><%= rightText %></div>'),
  
  initialize: function(){
    var self = this;
    this.model.on('change', function(){
      self.render();
    });
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
