var Promise = require('bluebird')

module.exports = (req, res, next) => {
  var User = req.model('User')

  req.data.user = User.findOneAndUpdate({_id: req.params.id}, user)
    .then(user => {
      if(!user) throw new Error('User not found');
      return Promise.props({
        user: user.update(req.body)
      })
  })

  next()
}
