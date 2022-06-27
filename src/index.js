import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${toFahrenheit(response.main.temp)} degrees.`);
      $('.showFeels').text(`The temperature in Fahrenheit feels like ${toFahrenheit(response.main.feels_like)} degrees.`);
      $('.showPressure').text(`The current pressure is ${response.main.pressure}hPa.`);
      $('.showMax').text(`The max temperature for today in Fahrenheit is ${toFahrenheit(response.main.temp_max)} degrees.`);
      $('.showMin').text(`The minimum temperature for today in Fahrenheit is ${toFahrenheit(response.main.temp_min)} degrees.`);
    }    
    
    function toFahrenheit(temp) {
      let newTemp = parseFloat(((temp) - 273.15) * 9/5 + 32).toFixed(2);
      return newTemp;
    }
  });
});