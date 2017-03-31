
var WeatherView = Backbone.View.extend({
  initialize: function() {
    var contents = $("#weather-template").html()
    this.template = _.template(contents);
  },

  render: function() {
    this.$el.html(this.template(this));
  },

  renderFailure: function() {
    this.$el.html("Error");
  },
  events:{
        "click .save":"savesvitla"
  },

  savesvitla:function(){
      $.get( "http://localhost:9966/svitla/weathers/new", function( data ) {
        $( ".save" ).html( data );
        alert( "Load was performed." );
      });
  }
});
