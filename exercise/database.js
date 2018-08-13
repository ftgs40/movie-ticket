const monk = require('monk');
const { database } = require('./config')
const db = monk(database);

module.exports = db;