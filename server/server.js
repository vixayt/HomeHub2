const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

const weatherAPI = require('./api/weather');
const trimetAPI = require('./api/trimet');
const {teamQuery, gameQuery, rushQuery, passQuery, recQuery, defQuery, kickQuery, puntReturnQuery, kickReturnQuery} = require('./api/football');

const path = require('path');
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
  teamQuery((err, rs) => {
    if(err) {
      console.log("error");
    }
    res.status(200).send(rs.rows);
  }
  )
});

app.get('/api/games', async(req, res) => {
  var team = req.query.team;
  var year = req.query.year;
  var date1 = '8/1/' + year;
  var date2 = '1/31/' + (+year + 1);
  let games = await gameQuery([team, date1, date2]);
  res.status(200).send(games.rows);
});

app.get('/api/leaders', async(req, res) => {
  var team = req.query.team;
  var game = req.query.game;
  var leaders = {}

  var rush_leaders = await rushQuery([team, game]);
  var pass_leaders = await passQuery([team, game]);
  var rec_leaders = await recQuery([team, game]);
  var def_leaders = await defQuery([team, game]);
  var punt_return_leaders = await puntReturnQuery([team, game]);
  var kicking_leaders = await kickQuery([team, game]);
  var kick_return_leaders = await kickReturnQuery([team, game]);
 

  leaders.passing = pass_leaders.rows;
  leaders.rushing = rush_leaders.rows;
  leaders.receiving = rec_leaders.rows;
  leaders.defense = def_leaders.rows;
  leaders.punt = punt_return_leaders.rows;
  leaders.kicking = kicking_leaders.rows;
  leaders.kick_return = kick_return_leaders.rows;

  
  res.status(200).send(leaders);
});





app.listen(port, () => console.log(`Listening on port ${port}`));
