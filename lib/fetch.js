// var config = {
//   proxy:
// }

var Url = require('url')
var qs = require('qs')
var cheerio = require('cheerio')
var request = require('request-promise').defaults({
  transform: cheerio.load,
  // proxy: config.proxy,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0',
    'Accept': 'application/json,application/xml,application/xhtml+xml,text/html'
  }
})
var honestRequest = require('request-promise').defaults({
  transform: cheerio.load
})

function makeUrl(host, parts, query) {
  var url = Url.resolve(host, parts.join('/'))
  if(!(query && Object.keys(query).length)) return url
  return [url, qs.stringify(query)].join('?')
}

module.exports = function fetch(root, parts, query={}) {
  var honest = query.honest
  delete query.honest
  var url = makeUrl(root, parts, query)
  console.log('Fetching: ', url, honest ? 'honestly' : 'sneakily')
  return honest ? honestRequest.get(url) : request.get(url)
}
