require('../model/users');

var models = require('../middleware/models');
var serialize = require('../middleware/serialize');
var router = require('express').Router();
var passport = require('passport');

router
    .use(models)
    .use('/auth', require('./auth'))
    .use(passport.authorize('jwt', {session: false}))
    .use(require('../middleware/userify'))
    .use('/scrape', require('./scrape'))
    .use('/users', require('./users'))
    .use(serialize);


module.exports = router;
