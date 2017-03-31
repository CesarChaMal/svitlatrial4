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
var WeatherModel = Backbone.Model.extend({
  url: function() {
    var base = app.api + "weather?APPID=173b604187ac9f50a8b4dd6d114061d2&q=London";

    if (!this.useLatLng) {
      return base + "q=" + this.get("name");
    }

    return base + "lat=" + this.get("lat") + "&lon=" + this.get("lng");
  },

  parse: function(resp) {
    // Convert Kelvin to Fahrenheit.
    resp.main.temp = Math.floor((resp.main.temp - 273.15) * 1.8) + 32 + " F";
    // Add a percentage sign.
    resp.main.humidity = resp.main.humidity + "%";
    // Add sea level (mb) unit.
    resp.main.pressure = resp.main.pressure + " MB";
    // Convert wind speed to MPH.
    resp.wind.speed = (resp.wind.speed * 1.15078).toFixed(2) + " MPH";
    // Add deg symbol.
    resp.wind.deg = resp.wind.deg + "&deg;";

    return resp;
  }
});
