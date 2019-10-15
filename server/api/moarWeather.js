const request = require('request');
const { darkSkyWeatherForecastApiKey } = require('../envconfig');

var getWeather = (lat, lon, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${darkSkyWeatherForecastApiKey}/${lat},${lon}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        callback(undefined, {
          current: response.body.currently,
          dailyForecast: response.body.daily
        });
      } else {
        callback('Server error');
      }
    }
  );
};

module.exports.getWeather = getWeather;
