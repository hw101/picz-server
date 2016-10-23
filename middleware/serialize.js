var Promise = require('bluebird')
module.exports = function(req, res, next) {

  (req.data.then ? req.data : Promise.props(req.data))
    .then(function(data){
      res.json(data)
    })

    .catch(function(error) {
      console.error('Error while serializing data:', error)
      res.status(422).json({error: error.errors || error})
    })
}
