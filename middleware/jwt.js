var jwt = require('jsonwebtoken')

module.exports = function(secret) {
  function verifyAuthorization(authorization) {
    try {
      return jwt.verify(authorization.split(' ').pop(), secret)
    } catch(e) {
      return null
    }
  }
  function createToken(user) {
    return jwt.sign({
      sub: user.id,
      uid: user.id,
      name: user.username || user.email,
      role: user.role
    }, secret)
  }
  return {
    createToken: createToken,
    verifyAuthorization: verifyAuthorization,
    issueToken(req, res, next) {
      if(!req.user) return next()
      req.token = createToken(req.user)
      next()
    },
    checkToken(req, res, next) {
      if(!req.headers.authorization) return next()
      var token = verifyAuthorization(req.headers.authorization)
      if(!token || token === 'undefined') return next()
      req.model('User').findById(token.sub).then(user => {
        req.user = user
        next()
      }).catch(err => {
        console.error(err.stack)
        next()
      })
    }
  }
}
