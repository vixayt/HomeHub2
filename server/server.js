const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

const weatherAPI = require('./api/weather');
const trimetAPI = require('./api/trimet');
const {teamQuery, gameQuery} = require('./api/football');

const path = require('path');
const db = require('./api/db');
app.use(cors());
app.use(bodyParser.json());

app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await weatherAPI(req.query.city);
    res.status(200).send({ weatherData });
  } catch (error) {
    console.log('Weather Server Error');
    res.status(500).send({ Error: 'Weather Server Error' });
  }
});

app.get('/api/trimet', async (req, res) => {
  try {
    const trimetData = await trimetAPI(req.query.locations);
    res.status(200).send({ trimetData });
  } catch (error) {
    console.log('Trimet server error', error);
    res.status(500).send({ Error: 'Trimet server Error' });
  }
});

app.get('/api/teams', async (req, res) => {
  db.query('SELECT name FROM team;', [], (err, rs) => {
    if(err) {
      console.log("error");
    }
    res.status(200).send(rs.rows);
  }
  )
});

app.get('/api/games', async(req, res) => {
  console.log("HERE");
  gameQuery([], (err, rs) => {
    if(err) {
      console.log("error");
    }
    console.log(res.rows);
    res.status(200).send(rs.rows);
  });
});



app.listen(port, () => console.log(`Listening on port ${port}`));
