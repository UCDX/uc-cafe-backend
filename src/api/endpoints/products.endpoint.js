const router = require('express').Router()
const productFlows = require('../flows/products.flow')

router.get('/search', productFlows.searchProducts)

module.exports = router