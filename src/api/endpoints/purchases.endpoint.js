const router = require('express').Router()
const purchaseFlow = require('../flows/purchases.flow')

router.post('/make', purchaseFlow.makePurchase)

module.exports = router
