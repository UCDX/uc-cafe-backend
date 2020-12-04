const productCtrl = require('../controllers/products.controller')
const productMidd = require('../../middlewares/products.middleware')
const generalMidd = require('../../middlewares/general')

module.exports = {
  searchProducts: [
    productMidd.checkSearchProductsParams,
    productCtrl.searchProducts
  ],

  addComment: [
    generalMidd.userAuth,
    productMidd.checkAddCommentParams,
    productCtrl.addComment
  ],

  getReviews: [
    productMidd.checkGetReviews,
    productCtrl.getReviews
  ],

  getCategories: [
    //without middleware because theres no parameters
    productCtrl.getCategories
  ],

  getProduct: [
    productMidd.checkGetProductParam,
    productCtrl.getProduct
  ]
}