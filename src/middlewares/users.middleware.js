const Validator = require('better-validator')

module.exports = {
  checkSignInData: function(req, res, next) {
    let validator = new Validator()
    validator(req.body).required().isObject(obj => {
      obj('username').required().isString()
      obj('passwd').required().isString()
    })

    const errors = validator.run();
    if (errors.length > 0) {
      console.log(errors)
      return res.status(400).send({message: 'Something is wrong with the data provided'})
    }

    next()
  }
}