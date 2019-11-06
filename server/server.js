const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

const weatherAPI = require('./api/weather');
const trimetAPI = require('./api/trimet');

const path = require('path');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await weatherAPI(req.query.city);
    res.status(200).send({ weatherData });
  } catch (error) {
    console.log('Weather Server Error');
    res.status(500).send({ Error: 'Weater Server Error' });
  }
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
