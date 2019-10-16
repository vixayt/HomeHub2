const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

const weatherAPI = require('./api/weather');
const weather = require('./api/moarWeather');
const trimetAPI = require('./api/trimet');

const path = require('path');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/weather', async (req, res) => {
  weatherAPI(req.body.city, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      weather.getWeather(
        results.lat,
        results.lon,
        (errorMessage, weatherResults) => {
          if (errorMessage) {
            console.log(errorMessage);
          } else {
            res.status(200).send({ weatherResults });
          }
        }
      );
    }
  });
});

app.get('/api/trimet', async (req, res) => {
  try {
    const trimetData = await trimetAPI();
    res.status(200).send({ trimetData });
  } catch (error) {
    console.log('Trimet server error', error);
    res.status(500).send({ Error: 'Trimet server Error' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
