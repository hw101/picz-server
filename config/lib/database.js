var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../config');
mongoose.connect(config.get('db:uri'));
var connection = mongoose.connection;

connection.on('error', function onConnectionError(error) {
  console.error('db error:', error.stack)
});

connection.once('open', function (callback) {
  console.error('db connected')
});

module.exports = connection;
