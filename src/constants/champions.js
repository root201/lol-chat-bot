const _ = require('lodash');
const staticChampionData = require('../static/champions.json');

const champions = {};

_.forEach(staticChampionData.data, function(value) {
  champions[value.key] = {
    name: value.name
  };
});

module.exports = champions;
