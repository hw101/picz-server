var path = require('path');

module.exports = {
  db: {
    uri:'mongodb://localhost/picz',
    options: {
      user: '',
      pass: ''
    }
  },
  server: {
    port: 3000
  },
  ios: {
    key: path.join(process.cwd(), "certificates/PiczDevKey.pem"),
    cert: path.join(process.cwd(), "certificates/PiczDevCert.pem")
  },
  android: {
    apiKey: "",
    senderId: 0
  },
  jwt: {
    secretOrKey: ''
  },
  defaultRedirect: '',
  log: {
    format: 'dev'
  },
  aws: {
    accessKeyId: '',
    secretAccessKey: '',
    bucket: ''
  }
};
