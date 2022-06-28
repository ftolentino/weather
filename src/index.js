import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js'

function clearFields() {
  $('#location').val("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showFeels').text("");
  $('.showPressure').text("");
  $('.showMax').text("");
  $('.showMin').text("");
  $('.showDesc').text("");
}


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let location = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(location);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${location} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${toFahrenheit(body.main.temp)} degrees.`);
      $('.showFeels').text(`The temperature in Fahrenheit feels like ${toFahrenheit(body.main.feels_like)} degrees.`);
      $('.showPressure').text(`The current pressure is ${body.main.pressure}hPa.`);
      $('.showMax').text(`The max temperature for today in Fahrenheit is ${toFahrenheit(body.main.temp_max)} degrees.`);
      $('.showMin').text(`The minimum temperature for today in Fahrenheit is ${toFahrenheit(body.main.temp_min)} degrees.`);
      $('.showDesc').text(`The forecast today includes ${body.weather[0].main} skies.`);
    }, function(error) {
      $('.showError').text(`There was an error processing your request; ${error}`)
    });    
    
    function toFahrenheit(temp) {
      let newTemp = parseFloat(((temp) - 273.15) * 9/5 + 32).toFixed(2);
      return newTemp;
    }
  });
});