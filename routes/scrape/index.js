var fetch = require('../../lib/fetch')

function index(req, res, next) {
  var data = fetch('http://www.reddit.com', '/r/funny/top')
  return data
}

module.exports = require('express').Router()
  .get('/', index);
