env = process.env.NODE_ENV || 'development';
module.exports = require('nconf')
  .env({
    separator: '_'
  })
  .argv()
  .defaults(
    require('./env/' + env)
  );
