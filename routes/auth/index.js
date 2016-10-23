var router = require('express').Router();
var passport = require('passport');

require('./local')(router);

module.exports = router;
