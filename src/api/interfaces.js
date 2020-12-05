const router = require('express').Router()
const userEndpoints = require('./endpoints/users.endpoint')
const productEndpoints = require('./endpoints/products.endpoint')
const purchaseEndpoints = require('./endpoints/purchases.endpoint')

router.use('/users', userEndpoints)
router.use('/products', productEndpoints)
router.use('/purchase', purchaseEndpoints)

module.exports = router;