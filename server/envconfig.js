const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  openWeatherMapApiKey: process.env.OPENWEATHERMAPAPIKEY,
  darkSkyWeatherForecastApiKey: process.env.DARKSKYWEATHERFORECASTAPIKEY,
  port: process.env.PORT
};
