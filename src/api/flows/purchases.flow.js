const purchasesController = require('../controllers/purchases.controller')
const generalMiddlewares = require('../../middlewares/general')
const purchaseMiddlewares = require('../../middlewares/purchases.middleware')

module.exports = {
  makePurchase: [
    generalMiddlewares.userAuth,
    purchaseMiddlewares.checkMakingPurchaseData,
    purchasesController.makePurchase
  ]
}
