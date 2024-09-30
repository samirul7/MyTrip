const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // req._id = '66ed89e84b22ae3b1744551c' // must be removed/delete
  // next()
  let token = req.headers.authorization || req.headers.Authorization
  if (!token) return res.sendStatus(401)
  token = token.split(' ')[1]
  try {
    const { _id } = jwt.verify(token, config.get('jwtPrivateKey'))
    req._id = _id
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}
