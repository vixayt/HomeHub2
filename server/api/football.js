const { Client } = require('pg')

const  client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'sample_cfb',
    password: '1234'
})
client.connect()

var game_query = `SELECT 
                    g.date as Date,
                    g.game_id as game_id, 
                    s.name as stadium,
                    s.city as city,
                    s.state as state,
                    s.capacity as capacity,
                    g.attendance as attendance,
                    t1.name as home_team,
                    ts1.points as home_score, 
                    ts1.rush_yard as home_rush,
                    ts1.rush_att as home_rush_att,
                    ts1.rush_td as home_rush_td,
                    ts1.pass_yard as home_pass_yards,
                    ts1.pass_comp as home_pass_comp,
                    ts1.pass_att as home_pass_att,
                    ts1.pass_td as home_pass_td,
                    t2.name as away_team,
                    ts2.points as away_score,
                    ts2.rush_yard as away_rush,
                    ts2.rush_att as away_rush_att,
                    ts2.rush_td as away_rush_td,
                    ts2.pass_yard as away_pass_yards,
                    ts2.pass_comp as away_pass_comp,
                    ts2.pass_att as away_pass_att,
                    ts2.pass_td as away_pass_td
                FROM game g
                JOIN team t1 ON t1.team_id = g.homeTeam
                JOIN team t2 ON t2.team_id = g.visitTeam
                JOIN stadium s on g.stadium = s.stadium_code
                JOIN team_stats ts1 ON ts1.team = t1.team_id AND ts1.game = g.game_id
                JOIN team_stats ts2 ON ts2.team = t2.team_id AND ts2.game = g.game_id
                WHERE (t1.name = $1
                OR t2.name= $1)
                AND g.date BETWEEN $2 AND $3 
                ORDER BY g.date;`;

var rushLeadersQuery = `SELECT DISTINCT 
                            p.last_name, p.first_name, p.position, 
                            p.number, ps.rush_yard, 
                            ps.rush_att, 
                            ps.rush_td FROM player p
JOIN playerStats ps ON p.player_id = ps.player
JOIN game g ON g.game_id = ps.game 
JOIN playerteamrel ptr ON ptr.player = p.player_id
JOIN team t ON ptr.team = t.team_id
WHERE t.name = $1 AND g.game_id = $2 AND ps.rush_att > 0 ORDER BY ps.rush_yard DESC;`


var pass_leaders_query = `SELECT DISTINCT 
                            p.last_name, p.first_name, p.position, 
                            p.number, ps.pass_yard, 
                            ps.pass_att,
                            ps.pass_comp,
                            ps.pass_int, 
                            ps.pass_td FROM player p
                        JOIN playerStats ps ON p.player_id = ps.player
                        JOIN game g ON g.game_id = ps.game 
                        JOIN playerteamrel ptr ON ptr.player = p.player_id
                        JOIN team t ON ptr.team = t.team_id
                        WHERE t.name = $1 AND g.game_id = $2 
                        AND ps.pass_att > 0 ORDER BY ps.pass_yard DESC;`;

var rec_leaders_query = `SELECT DISTINCT
                            p.last_name, p.first_name, p.position, 
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


var kicking_query = `SELECT DISTINCT
                        p.last_name, p.first_name, p.position,
                        p.number, 
                        ps.field_goal_att,
                        ps.field_goal_made
                    FROM player p
                    JOIN playerStats ps ON p.player_id = ps.player
                    JOIN game g ON g.game_id = ps.game 
                    JOIN playerteamrel ptr ON ptr.player = p.player_id
                    JOIN team t ON ptr.team = t.team_id
                    WHERE t.name = $1 AND g.game_id = $2 
                    AND ps.field_goal_att > 0 ORDER BY ps.field_goal_att DESC;`;

var punt_return = `SELECT DISTINCT
                            p.last_name, p.first_name, p.position,
                            p.number,
                            ps.punt_ret,
                            ps.punt_ret_yards,
                            ps.punt_ret_td
                        FROM player p
                        JOIN playerStats ps ON p.player_id = ps.player
                        JOIN game g ON g.game_id = ps.game 
                        JOIN playerteamrel ptr ON ptr.player = p.player_id
                        JOIN team t ON ptr.team = t.team_id
                        WHERE t.name = $1 AND g.game_id = $2 
                        AND ps.punt_ret > 0 ORDER BY ps.punt_ret_yards DESC;`;

var kick_return = `SELECT DISTINCT 
                            p.last_name, p.first_name, p.position,
                            p.number,
                            ps.kickoff_ret,
                            ps.kickoff_ret_yards,
                            ps.kickoff_ret_td
                        FROM player p
                        JOIN playerStats ps ON p.player_id = ps.player
                        JOIN game g ON g.game_id = ps.game 
                        JOIN playerteamrel ptr ON ptr.player = p.player_id
                        JOIN team t ON ptr.team = t.team_id
                        WHERE t.name = $1 AND g.game_id = $2 
                        AND ps.kickoff_ret > 0 ORDER BY ps.kickoff_ret_yards DESC;`;
                

var defense_query = `SELECT DISTINCT
                        p.last_name, p.first_name, p.position, 
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


team_query = `SELECT DISTINCT t.name 
                FROM team t 
                JOIN confteamrel cr ON cr.team = t.team_id 
                JOIN conference c ON c.conference_id = cr.conference 
                WHERE c.subdivision = 'FBS' 
                ORDER BY t.name;`;



module.exports = {
    teamQuery: (callback) => {
        return client.query(team_query, [], callback);
    },

    gameQuery: (params) => {
        return client.query(game_query, params);   
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
    },

    kickQuery: (params) => {
        return client.query(kicking_query, params);
    },

    puntReturnQuery: (params) => {
        return client.query(punt_return, params);
    },

    kickReturnQuery: (params) => {
        return client.query(kick_return, params);
    }


}