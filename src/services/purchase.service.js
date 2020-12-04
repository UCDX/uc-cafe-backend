const mariadb = require('./mariadb.service')

module.exports = {
  makePurchase: async function(user_id, products) {
    let makePurchaseQuery = `insert into purchases (user_id) values(?)`
    let addProductQuery = `insert into user_purchases (purchase_id, product_id, quantity) values(?,?,?)`

    let conn

    try {
      conn = await mariadb.getConnection()
      conn.beginTransaction()
      let purchase = await conn.query(makePurchaseQuery, [user_id])
      console.log(purchase)
      for(let product of products) {
        await conn.query(addProductQuery,
          [purchase.insertId, product.product_id, product.quantity])
      }
      conn.commit()
      conn.release()
      return purchase.insertId
    } catch(err) {
      if(conn) {
        conn.rollback()
        conn.release()
      }
      throw err
    }
  }
}
