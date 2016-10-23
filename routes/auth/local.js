var jwt = require('jwt-simple');
var Promise = require('bluebird');
var config = require('../../config/config');
var options = config.get('jwt');
var lowercaseEmail = require('../../middleware/lowercase-email');
var passport = require('../../config/lib/local');

module.exports = (router) => {

  // Sign up
  router.post('/register', [lowercaseEmail,
    function signin(req, res, next) {
    var User = req.model('User');
    var password = req.body.password;
    delete req.body.password;
    var user = new User(req.body);
    var register = Promise.promisify(User.register, User);

    req.data.user = register(user, password).then(() => {
      var payload = {sub: user._id};
      user = user.toJSON();
      user.token = jwt.encode(payload, options.secretOrKey);
      res.json({user: user})
    })
  }]);

  // Sign in
  router.post('/login',
    passport.authenticate('local', { session: false }), (req, res, next) => {
    var payload = {
      sub: req.user._id
    };
    var user = req.user.toJSON();
    user.token = jwt.encode(payload, options.secretOrKey);
    res.json({user: user})
  });

  return router;
};
