const { Client } = require('pg')

const  client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testDB',
    password: '1234'
})
client.connect()

var team_query = `SELECT 
                    g.date as Date,
                    g.game_id as game_id, 
                    t1.name as Home_Team,
                    ts1.points as Home_Score, 
                    ts1.rush_yard as Home_Rush,
                    t2.name as Away_Team,
                    ts2.points as Away_Score,
                    ts2.rush_yard as Away_Rush
                FROM game g
                JOIN team t1 ON t1.team_id = g.homeTeam
                JOIN team t2 ON t2.team_id = g.visitTeam
                JOIN team_stats ts1 ON ts1.team = t1.team_id AND ts1.game = g.game_id
                JOIN team_stats ts2 ON ts2.team = t2.team_id AND ts2.game = g.game_id
                WHERE (t1.name = $1
                OR t2.name= $1)
                AND g.date BETWEEN $2 AND $3 
                ORDER BY g.date;`;

var rushLeadersQuery = `SELECT DISTINCT 
                            p.last_name, p.first_name, 
                            p.number, ps.rush_yard, 
                            ps.rush_att, 
                            ps.rush_td FROM player p
JOIN playerStats ps ON p.player_id = ps.player
JOIN game g ON g.game_id = ps.game 
JOIN playerteamrel ptr ON ptr.player = p.player_id
JOIN team t ON ptr.team = t.team_id
WHERE t.name = $1 AND g.game_id = $2 AND ps.rush_yard > 0 ORDER BY ps.rush_yard DESC;`


var pass_leaders_query = `SELECT DISTINCT 
                            p.last_name, p.first_name, 
                            p.number, ps.pass_yard, 
                            ps.pass_att,
                            ps.pass_comp, 
                            ps.pass_td FROM player p
                        JOIN playerStats ps ON p.player_id = ps.player
                        JOIN game g ON g.game_id = ps.game 
                        JOIN playerteamrel ptr ON ptr.player = p.player_id
                        JOIN team t ON ptr.team = t.team_id
                        WHERE t.name = $1 AND g.game_id = $2 
                        AND ps.pass_yard > 0 ORDER BY ps.pass_yard DESC;`;

var rec_leaders_query = `SELECT DISTINCT
                            p.last_name, p.first_name,
                            p.number, ps.pass_yard,
                            ps.rec,
                            ps.rec_yards,
                            ps.rec_td FROM player p
                        JOIN playerStats ps ON p.player_id = ps.player
                        JOIN game g ON g.game_id = ps.game 
                        JOIN playerteamrel ptr ON ptr.player = p.player_id
                        JOIN team t ON ptr.team = t.team_id
                        WHERE t.name = $1 AND g.game_id = $2 
                        AND ps.rec > 0 ORDER BY ps.rec_yards DESC;`;

                    

var defense_query = `SELECT DISTINCT
                        p.last_name, p.first_name,
                        p.number, ps.tackle_solo,
                        ps.tackle_assist, ps.tackle_forloss,
                        ps.sack, ps.sack_yard, ps.qb_hurry,
                        ps.fumble_forced, ps.pass_borken,
                        ps.kick_punt_block
                    FROM player p
                    JOIN playerStats ps ON p.player_id = ps.player
                    JOIN game g ON g.game_id = ps.game 
                    JOIN playerteamrel ptr ON ptr.player = p.player_id
                    JOIN team t ON ptr.team = t.team_id
                    WHERE t.name = $1 AND g.game_id = $2 
                    ORDER BY ps.tackle_solo DESC LIMIT 10;`;




module.exports = {
    teamQuery: (callback) => {
        return client.query('SELECT name FROM team;', [], callback);
    },

    gameQuery: (params) => {
        return client.query(team_query, params);   
    },

    rushQuery: (params) => {
        return client.query(rushLeadersQuery, params);
    },

    passQuery: (params) => {
        return client.query(pass_leaders_query, params);
    },
    
    recQuery: (params) => {
        return client.query(rec_leaders_query, params);
    },

    defQuery: (params) => {
        return client.query(defense_query, params);
    }
}