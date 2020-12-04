const { Validator, parseValidatorOutput } = require('../services/validator.service')

module.exports = {
  checkMakingPurchaseData: function(req, res, next) {
    let validator = new Validator()
    validator(req.body.purchases).isObjectArray(child => {
      child('product_id').isNumber().isPositive().integer().required()
      child('quantity').isNumber().isPositive().integer().required()
    })

    let errors = parseValidatorOutput(validator.run())
    if(errors.length) {
      return res.status(400).json({
        messages: errors
      })
    }
    next()
  }
}
