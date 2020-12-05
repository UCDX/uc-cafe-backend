const authenticationService =  require('../services/authentication.service')
const cryptService = require('../services/crypt.service')

module.exports = {
  appAuth: async function(req, res, next) {
    let apikey = req.headers['api-key']
    if(!apikey) {
      return res.status(401).json({ messages:['Missing api-key'] })
    }
    
    try {
      let app = await authenticationService.getAppDataByAPIKey(apikey)

      if(!app) {
        return res.status(401).json({ messages:['Not valid api-key'] })
      }

      console.log('Request from:', app.name)
      return next()
    } catch(err) {
      console.log('Error while fetching requesting-app data')
      console.log(err)
      res.status(500).end()
    }
  },

  //Set headers to allow external connections.
  allowExternalConnections: function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
      "api-key, Authorization, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Request-Method, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE")
    res.header("api-key")
    return next()
  },

  userAuth: function(req, res, next) {
    let token = req.headers.authorization
    if(!token) {
      return res.status(401).json({
        messages: ['Authentication is missing']
      })
    }
    try {
      let payload = cryptService.decodeJWT(token)
      console.log(payload.user_id)
      req.api.user_id = payload.user_id
      return next()
    } catch(err) {
      console.log('Error while decoding token')
      console.log(err.message)
      res.status(500).end()
    }
  },

  apiSection: function(req, res, next) {
    req.api = {}
    next()
  }
}
