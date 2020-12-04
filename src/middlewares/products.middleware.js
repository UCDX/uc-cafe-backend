const {
  Validator,
  parseValidatorOutput, 
  parseNumberFromGroupIfApplic,
  parseNumberIfApplicable,
  parseNumberIfApplicableInt,
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
  },

  checkAddCommentParams: function(req, res, next) {
    let validator = new Validator()
    //console.log("MIDDLEWARE\n");

    req.params.product_id = parseNumberIfApplicableInt(req.params.product_id)
    req.body.user_id = parseNumberIfApplicableInt(req.body.user_id)
    
    if(typeof req.body.score !== 'undefined'){
      req.body.score = parseNumberIfApplicable(req.body.score)
    }

    if(validator(req.body.user_id).isNumber()
        && validator(req.body.product_id).isNumber()){
      next()
    }

    return res.status(400)
  },

  checkGetReviews: function(req, res, next){
    let validator = new Validator()
    
    if(typeof req.params.product_id !== 'undefined'){
      req.params.product_id = parseNumberIfApplicableInt(req.params.product_id)
    }

    if(validator(req.params.product_id).isNumber()){
      next()
    }

    return res.status(400)
  }
}
