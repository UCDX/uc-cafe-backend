const router = require('express').Router()
const userEndpoints = require('./endpoints/users.endpoint')
const productEndpoints = require('./endpoints/products.endpoint')

router.use('/users', userEndpoints)
router.use('/products', productEndpoints)

module.exports = router;