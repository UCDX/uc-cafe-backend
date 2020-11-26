const crypto = require('crypto')
const jwt = require('jwt-simple')

const secret = 'uc-cafe-dihm'

module.exports = {
  hash: function(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data)

    return hash.digest('hex')
  },

  generateJWT: function(payload) {
    return jwt.encode(payload, secret)
  },

  decodeJWT: function(token) {
    return jwt.decode(token, secret)
  }
}