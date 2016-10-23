var config = require('./../config');
var options = config.get('jwt');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../../model/users/index');
options.jwtFromRequest =
  ExtractJwt.versionOneCompatibility({authScheme: "JWT"})

module.exports = new JwtStrategy(options, function(jwt_payload, done) {
  User.findById(jwt_payload.sub)
    .exec(function(err, user) {
      if (err) return done(err, false);
      if (user) return done(null, user);
      done(null, false)
    });
});
