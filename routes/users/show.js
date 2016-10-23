module.exports = (req, res, next) => {
  req.data.user = req.model('User').findById(req.params.id)
  next()
};
