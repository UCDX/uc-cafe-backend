const router = require('express').Router()
const productFlows = require('../flows/products.flow')

router.post('/product/:product_id/comment', productFlows.addComment)

router.get('/search', productFlows.searchProducts)

router.get('/product/:product_id/review', productFlows.getReviews)

router.get('/categories', productFlows.getCategories)

router.get('/product/:product_id', productFlows.getProduct)

module.exports = router