function index(req, res, next) {
  req.data.users = req.model('User')
    .find(req.params)
  next()
}

module.exports = require('express').Router()
  .get('/', index)
  .get('/me', require('./me'))
  .get('/:id', require('./show'))
  .patch('/:id', require('./save'))
