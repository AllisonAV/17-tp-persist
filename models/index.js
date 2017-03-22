const db = require('./_db');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Place = require('./place');
const Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.belongsTo(Hotel);

Day.belongsToMany(Restaurants, {
  through: 'day_restaurant'
})

Day.belongsToMany(Activities, {
  through: 'day_activity'
})

module.exports = db;
