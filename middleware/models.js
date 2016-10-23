var mongoose = require('mongoose');

module.exports = function models(req, res, next) {
  req.model = mongoose.model.bind(mongoose);
  req.data = {};
  next()
};
