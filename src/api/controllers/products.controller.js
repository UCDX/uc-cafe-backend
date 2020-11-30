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
        messages: ['Done'],
        data: result
      })
    } catch (error) {
      res.status(500).end()
    }
  }
}
