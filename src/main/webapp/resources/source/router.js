
var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "weather/:city": "showWeather"
  },

  initialize: function() {
    this.weather = $(".weather");
    this.weatherModel = new WeatherModel();
    this.formView = new FormView({
      model: this.weatherModel
    });
    this.weatherView = new WeatherView({
      model: this.weatherModel
    });
  },

  home: function() {
    this.weather.empty();
  },
  showWeather: function(city) {
    this.weather.empty();
    this.weatherModel.set("name", city);
    this.formView.$("input").val(city);

    // Get the latest weather.
    this.weatherModel.fetch({
      timeout: 1000,
      error: function() {
        this.weatherView.renderFailure();
      }.bind(this)
      
      
    });

    this.weatherModel.once("sync", function() {
      this.weatherView.render();
    }, this);

    this.weather.append(this.weatherView.el);
  }
});
