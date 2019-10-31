const axios = require('axios');
const { trimetApiKey } = require('../envconfig');

const trimetAPI = async () => {
  try {
    const response = await axios.get(
      `http://developer.trimet.org/ws/v2/arrivals/?appID=${trimetApiKey}&locIDs=10293,9821`
    );
    const data = response.data.resultSet;
    return data;
  } catch (err) {
    console.log('http error', err);
  }
};
module.exports = trimetAPI;