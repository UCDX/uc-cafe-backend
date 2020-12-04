const { Validator, parseValidatorOutput } = require('../services/validator.service')

module.exports = {
  checkSignInData: function(req, res, next) {
    let validator = new Validator()
    validator(req.body).required().isObject(obj => {
      obj('username').required().isString()
      obj('passwd').required().isString()
    })

    const errors = parseValidatorOutput(validator.run());
    if (errors.length > 0) {
      return res.status(400).json({messages: errors})
    }

    next()
  }
}
