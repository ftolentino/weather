import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import WeatherService from "./js/weather-service.js";

function clearFields() {
  $("#location").val("");
  $(".showHumidity").text("");
  $(".showTemp").text("");
  $(".showFeels").text("");
  $(".showPressure").text("");
  $(".showMax").text("");
  $(".showMin").text("");
  $(".showDesc").text("");
}

function getElements(response) {
  if (response.main) {
    $(".showHumidity").text(
      `The humidity in ${response.name} is ${response.main.humidity}%`
    );
    $(".showTemp").text(
      `The temperature in Fahrenheit is ${toFahrenheit(
        response.main.temp
      )} degrees.`
    );
    $(".showFeels").text(
      `The temperature in Fahrenheit feels like ${toFahrenheit(
        response.main.feels_like
      )} degrees.`
    );
    $(".showPressure").text(
      `The current pressure is ${response.main.pressure}hPa.`
    );
    $(".showMax").text(
      `The max temperature for today in Fahrenheit is ${toFahrenheit(
        response.main.temp_max
      )} degrees.`
    );
    $(".showMin").text(
      `The minimum temperature for today in Fahrenheit is ${toFahrenheit(
        response.main.temp_min
      )} degrees.`
    );
    $(".showDesc").text(
      `The forecast today includes ${response.weather[0].main} skies.`
    );
  }

  function toFahrenheit(temp) {
    let newTemp = parseFloat(((temp - 273.15) * 9) / 5 + 32).toFixed(2);
    return newTemp;
  }
}

async function makeApiCall(city) {
  const response = await WeatherService.getWeather(city);
  getElements(response);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    makeApiCall(city);
  });
});
