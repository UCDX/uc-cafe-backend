const router = require('express').Router()
const userFlows = require('../flows/users.flow');

router.post('/signin', userFlows.signIn)

module.exports = router
