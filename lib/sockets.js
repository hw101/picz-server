var mongoose = require('mongoose');
var Promise = require('bluebird');
var SIO     = require('socket.io');
var jwt = require('jwt-simple');
var config = require('../config/config');
var options = config.get('jwt');

function notifications(server) {
  var io = SIO(server);

  notifications.sockets = Object.create(null);
  notifications.io = io;


  /*
  * On connection, start listening for login
  */
  io.on('connection', function (socket) {
    var user = undefined;
    var User = mongoose.model('User');
    console.log('New socket connection')
    /*
    * On login, add user to object
    */
    socket.on('login', function(token){
      user = jwt.decode(token, options.secretOrKey).sub;
      notifications.sockets[user] = socket;
      User.findOneAndUpdate({_id: user},{online: true},{new: true})
        .then(function(result) {
          if(!result) return ;// No such user

          /*
          * Tell everyone that he came online
          */
          for(var socket in notifications.sockets) {
            notifications.sockets[socket].emit('online', {
              user: user
            })
          }

        })
    })

    socket.on('error',function(err){
      console.error(err.stack)
    });

    /*
    * On disconnect, remove user from object if exists
    */
    socket.on('disconnect', function() {
       if(!user) return; // Wasn't logged in
       delete notifications.sockets[user];
       User.findOneAndUpdate({_id: user},{online: false},{new: true})
        .then(function(result) {
           if(!result) return; // No such user

           /*
           * Tell everyong that she logged out
           */
           for(var socket in notifications.sockets) {
             notifications.sockets[socket].emit('offline', {
               user: user
             })
           }

         })
    })
  });
  return io
}


module.exports = notifications;
