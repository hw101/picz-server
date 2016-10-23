module.exports = function(req, res, next) {
  if(req.account)
    req.user = req.account
  next()
}
