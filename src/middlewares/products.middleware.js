const {
  Validator,
  parseValidatorOutput, 
  parseNumberFromGroupIfApplic, 
  parseArrayIfApplic 
} = require('../services/validator.service')

module.exports = {
  checkSearchProductsParams: function(req, res, next) {
    let validator = new Validator()

    req.query = parseNumberFromGroupIfApplic(req.query)
    req.query.category = parseArrayIfApplic(req.query.category)
    if (req.query.search != undefined) {
      req.query.search = req.query.search.toString()
    }

    validator(req.query).isObject(obj => {
      obj('search').isString()
      obj('category').isArray(idCategory => {
        idCategory.isNumber().integer().isPositive()
      })
      obj('pag').isNumber().integer().notNegative(),
      obj('limits').isNumber().integer().isPositive()
    })

    const errors = parseValidatorOutput(validator.run());
    if (errors.length > 0) {
      return res.status(400).json({messages: errors})
    }

    next()
  }
}
