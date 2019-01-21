const axios = require('axios');
const API_KEY = require('../../secret/config.json').LOL_API_KEY;
const API_GET_USER = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name';
const API_SPECTATOR = 'https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner';
const API_MATCH = 'https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account';

const lolApi = {
  getByNickname: async function(nickname) {
    const result = {
      nickname,
      status: 404,
      spectator: null,
      match: null
    };
    let user = null;
    
    try {
      user = await axios({
        method: 'get',
        url: `${API_GET_USER}/${encodeURIComponent(nickname)}?api_key=${API_KEY}`,
      });
      result.status = user.status;
    } catch (err) {
      if (err.response && err.response.status) {
        result.status = err.response.status;
      }
    }
    
    if (user) {
      const [
        spectator,
        match
      ] = await Promise.all([
        axios.get(`${API_SPECTATOR}/${user.data.id}?api_key=${API_KEY}`)
          .catch(err => ({ status: err.response.status })),
        axios.get(`${API_MATCH}/${user.data.accountId}?api_key=${API_KEY}`)
          .catch(err => ({ status: err.response.status }))
      ]);
      
      if (typeof spectator === 'object') {
        result.spectator = spectator;
      }
      if (typeof match === 'object') {
        result.match = match;
      }
    }
    
    return result;
  }
};

module.exports = lolApi;
