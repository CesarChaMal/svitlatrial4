/*
 *    Copyright ${license.git.copyrightYears} the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "weather/:city": "showWeather",
    "weather/:lat/:lng": "showWeatherByLatLng"
  },

  initialize: function() {
    // DOM constants.
    this.background = $(".background");
    this.weather = $(".weather");

    this.weatherModel = new WeatherModel();

    // Used to show current weather.
    this.weatherView = new WeatherView({
      model: this.weatherModel
    });

    this.formView = new FormView({
      model: this.weatherModel
    });

    // Only animate well after application has loaded.
    window.setTimeout(function() {
      app.mainElement.addClass("animate");
    }, 250);
  },

  home: function() {
    this.background.removeClass("flip");
    this.weather.empty();
  },

  showWeather: function(city) {
    this.background.addClass("flip");
    this.weather.empty();

    this.weatherModel.set("name", city);

    // Fill this in with whatever is passed by the URL param.
    this.formView.$("input").val(city);

    // Get the latest weather.
    this.weatherModel.fetch({
      timeout: 1000,

      // If no weather is found after half a second, display an error.
      error: function() {
        this.weatherView.renderFailure();
      }.bind(this)
    });

    // Show weather view once data has been fetched.
    this.weatherModel.once("sync", function() {
      this.weatherView.render();
    }, this);

    this.weather.append(this.weatherView.el);
  },

  showWeatherByLatLng: function(lat, lng) {
    this.background.addClass("flip");
    this.weather.empty();

    this.weatherModel.useLatLng = true;
    this.weatherModel.set({
      "lat": lat, "lng": lng
    });

    // Get the latest weather.
    this.weatherModel.fetch();

    // Show weather view once data has been fetched.
    this.weatherModel.once("sync", function() {
      this.weatherView.render();

      // Set to city name from API.
      this.formView.$("input").val(this.weatherModel.get("name"));

      // Hard reset the url to this new name.
      app.router.navigate("weather/" + this.weatherModel.get("name"));
    }, this);

    this.weather.append(this.weatherView.el);
  }
});
