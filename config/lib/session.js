var session = require('express-session');
var Store   = require('connect-mongo')(session);
var store   = new Store({db:'localhost/picz'});
var passIO  = require('passport.socketio');

var expressSession = session({
  name: 'picz-session',
  secret: 'footloose',
  resave: false,
  saveUninitialized: true,
  store: store
});

var socketIOSession = passIO.authorize({
  key: 'picz-session',
  secret: 'footloose',
  store: store
});

module.exports = {
  express: expressSession,
  socketIO: socketIOSession
};
