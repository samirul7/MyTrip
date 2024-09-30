const cookies = require('cookie-parser')

module.exports = function (app) {
  app.use(cookies())
}
