const axios = require("axios");
const {
  openWeatherMapApiKey,
  darkSkyWeatherForecastApiKey
} = require("../envconfig");

const weatherAPI = async args => {
  try {
    const openWeatherResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?${args}&units=imperial&APPID=${openWeatherMapApiKey}`
    );
    try {
      const darkWeatherResponse = await axios.get(
        `https://api.darksky.net/forecast/${darkSkyWeatherForecastApiKey}/${openWeatherResponse.data.coord.lat},${openWeatherResponse.data.coord.lon}`
      );
      return {
        currentTemperature: openWeatherResponse.data.main.temp,
        current: darkWeatherResponse.data.currently,
        dailyForecast: darkWeatherResponse.data.daily
      };
    } catch (error) {
      console.log("Dark Sky error", error);
    }
  } catch (error) {
    console.log("Open Weather error", error);
  }
};

module.exports = weatherAPI;
