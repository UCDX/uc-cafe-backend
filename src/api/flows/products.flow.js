const productCtrl = require('../controllers/products.controller')
const productMidd = require('../../middlewares/products.middleware')

module.exports = {
  searchProducts: [
    productMidd.checkSearchProductsParams,
    productCtrl.searchProducts
  ]
}