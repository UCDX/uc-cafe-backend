const userCtrl = require('../controllers/users.controller')
const userMidd = require('../../middlewares/users.middleware')

module.exports = {
  signIn: [
    userMidd.checkSignInData,
    userCtrl.signIn
  ]
}
