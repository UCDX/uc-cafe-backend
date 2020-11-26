const cryptService = require('../../services/crypt.service')
const userService = require('../../services/user.service')

module.exports = {
  signIn: async function(req, res) {
    try {
      const username = req.body.username
      const passwd = cryptService.hash(req.body.passwd)

      const userId = await userService.userAuthentication(username, passwd)

      if (!userId) {
        return res.status(401).json({message: 'Invalid credentials'})
      }

      const token = cryptService.generateJWT({user_id: userId})

      res.status(200).json({
        session_token: token
      })
    } catch (error) {
      res.status(500).end()
    }
  }
}
