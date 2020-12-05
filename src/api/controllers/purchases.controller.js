const purchaseService = require('../../services/purchase.service')

module.exports = {
  makePurchase: async function(req, res) {
    try {
      await purchaseService.makePurchase(req.api.user_id, req.body.purchases)
      res.status(200).json({
        purchases: req.body.purchases
      })
    } catch(err) {
      console.log(err.message)
      res.status(500).end()
    }
  }
}
