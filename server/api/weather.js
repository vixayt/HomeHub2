const request = require('request');
const { openWeatherMapApiKey } = require('../envconfig');

const weatherAPI = (city, callback) => {
  request(
    {
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${openWeatherMapApiKey}`
    },
    (err, response, body) => {
      if (err) {
        callback('Unable to connect to server');
      } else if (response.statusCode >= 200 && response.statusCode < 300) {
        resBody = JSON.parse(body);
        callback(undefined, {
          currentTemperature: resBody.main.temp,
          lat: resBody.coord.lat,
          lon: resBody.coord.lon
        });
      } else {
        callback(undefined, {
          response: response.statusCode,
          message: response.body.message
        });
      }
    }
  );
};

module.exports = weatherAPI;
