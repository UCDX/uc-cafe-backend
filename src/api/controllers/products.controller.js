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

    //console.log(typeof req.body.score !== 'undefined')
    try {
        let result = await productService.addComment(
          req.params.product_id,
          req.body.user_id,
          req.body.comment,
          req.body.score
        )  
    
      res.status(200).json({
        comment: result.comment
      })
    } catch (error) {
      res.status(500).end()
    }
  }
}
