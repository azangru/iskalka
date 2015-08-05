var ParagraphModel = Backbone.Model.extend({

  initialize: function(){
    this.set("paragraphId", 0);
    this.set("leftText", "");
    this.set("rightText", "");

    this.on('change', function(){
      console.log("wow!");
    });
  }

});
