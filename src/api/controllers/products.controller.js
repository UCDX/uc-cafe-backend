const productService = require('../../services/product.service')

module.exports = {
  searchProducts: async function(req, res) {
    try {
      let result = await productService.searchProducts(
        req.query.search,
        req.query.category,
        req.query.pag,
        req.query.limits
      )
      
      res.status(200).json({
        products: result.products,
        total: result.total
      })
    } catch (error) {
      res.status(500).end()
    }
  },

  addComment: async function(req, res) {
/**
 * params <- :id/(url)?¿?¿?
 * body <- postman body
 * query <- :id/(url)?¿?¿
 **/
    try {
      let result = await productService.addComment(
        req.params.product_id,
        req.body.user_id,
        req.body.comment
      )
      console.log(`Dentro de controller ${req.params.product_id} y ${req.body.user_id}`)
      res.status(200).json({
        comment: result.comment
      })
    } catch (error) {
      res.status(500).end()
    }
  }
}
