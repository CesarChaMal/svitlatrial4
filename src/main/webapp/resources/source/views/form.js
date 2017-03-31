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
var FormView = Backbone.View.extend({
  el: ".pure-form",

  events: {
    "click input": "changeWeather",
    "submit": "showWeather",
    "click .detect": "autoDetect"
  },

  changeWeather: function(ev) {
    if( this.input.val().length == 0){
      app.router.navigate("", true);
    }

    this.input.val("");
  },

  showWeather: function(ev) {
    // Lose focus on the input to make the animation look nicer.
    this.input.trigger("blur");
    app.router.navigate("weather/" + this.input.val(), true);

    return false;
  },

  // Will automatically retry if selected.
  autoDetect: function(ev) {
    // Lose focus on the input to make the animation look nicer.
    this.input.trigger("blur");

    // Attempt to use geolocation.
    if (navigator.geolocation) {
      // Find the current position.
      navigator.geolocation.getCurrentPosition(
        // Success.
        function(geo) {
          // Find the lat and long.
          var lat = geo.coords.latitude;
          var lng = geo.coords.longitude;

          // Lose focus on the input to make the animation look nicer.
          this.input.trigger("blur");
          app.router.navigate("weather/" + lat + "/" + lng, true);
        }.bind(this),

        // Failure.
        function() {
          this.input.prop("placeholder",
            "Unable to get location, please type manually.");
        }.bind(this),

        {
          // If a location is not found after five seconds, timeout.
          timeout: 5000
        }
      );
    }
  },

  initialize: function() {
    // Cache the input lookup.
    this.input = this.$("input");
  }
});
