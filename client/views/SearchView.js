var SearchView = Backbone.View.extend({
 
  tagName: 'div',
  id: "search-field",

  initialize: function() {
    this.render();
  },

  events: {
    "click #send-query" : "submit"
  },

  submit: function(e){
    var self = this;
    e.preventDefault();
    var query = $(e.currentTarget).parent().find("#query").val();
    $.get( "/find", { query: query } )
      .done(function(data) {
        self.model.announceResponse(data);
        // self.trigger('first paragraph', firstParagraph);
      });
  },

  render: function(){
    var html = "<input type='text' id='query'>" +
                "<button id='send-query'>Search</button>";
    return this.$el.html(html);
  }

});
