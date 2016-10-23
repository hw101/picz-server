module.exports = (req, res, next) => {
 req.model('User')
  .findById(req.user._id)
  .then(user => {
    res.json({user: user})
  })
}
