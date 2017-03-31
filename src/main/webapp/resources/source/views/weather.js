
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
      $.ajax({
          type: "POST",
          url: "http://localhost:9966/svitla/weathers/new",
          dataType: 'json',
          data: {
              city: $("tr:nth-child(2)").find('td:nth-child(2)').html(),
              temp: $("tr").find('td:nth-child(2)').html()
          },
          success:function( data ) {
              $( ".save" ).html( data );
              alert( "Load was performed." );
          }
      })
  }
});
