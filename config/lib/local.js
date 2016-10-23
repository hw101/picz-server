var passport = require('passport');
var User     = require('../../model/users/index');
var jwt      = require('./jwt');

passport.use(jwt);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
