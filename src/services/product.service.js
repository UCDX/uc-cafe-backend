const mariadb = require('./mariadb.service')

module.exports = {
  /**
   * Perform a search in the database retrieving all the product records that match with 'search' 
   * and/or 'category' parameter.
   * It can selects chunks of records of 'limits' size. The chunk number is defined by 'pag'.
   * @param {string} search 
   * @param {int[]} category 
   * @param {int} pag 
   * @param {int} limits 
   * @returns {Object}
   *  * products: Object.
   *  * total: int.
   */
  searchProducts: async function(search = '', category = [], pag = 0, limits = 10) {
    let query = `
      SELECT 
        products.id,
        products.name,
        products.image_url,
        products.price,
        products.short_description,
        categories.name AS category
      FROM
        products
          INNER JOIN
        categories ON products.category_id = categories.id
    `

    if (category.length) {
      query += `WHERE (categories.id = ? `
      for (i = 1; i < category.length; i++) {
        query += `OR categories.id = ? `
      }
      query += `) AND`
    } else {
      query += `WHERE `
    }

    search = search.split(' ').join('|')
    query += `
      (products.name REGEXP ? OR
      products.price REGEXP ? OR
      products.description REGEXP ? OR
      products.short_description REGEXP ? OR
      categories.name REGEXP ?)
      LIMIT ${pag * limits}, ${limits};
    `

    // Counts how much records there are.
    let countQuery = query.split('\n')
    countQuery.splice(2, 6, 'COUNT(*) AS total')
    // Remove 'limit' to select all records.
    countQuery.pop(); countQuery.pop()
    countQuery = countQuery.join('\n')
    countQuery += ';'

    let arguments = category
    arguments.push(search, search, search, search, search)

    let productsResult = await mariadb.query(query, arguments)
    let countResult = await mariadb.query(countQuery, arguments)
    return {
      products: productsResult,
      total: countResult[0].total
    }
  },

  /**
   * Inserts a review of a certain product by an specific user
   * 
   * @param {*} product_id 
   * @param {*} user_id 
   * @param {*} comment 
   * @param {*} score
   * @returns {Object}
   * * comment: comment
   */
  addComment: async function(product_id = 1, user_id = 1, comment = '', score = '') {
 
    if(typeof score !== 'undefined' && score !== ''){
      var query = `
      INSERT INTO reviews(user_id, product_id, score, comment)
      VALUES
      (?,?,?,?);
      `
      var arguments = [user_id, product_id, score, comment]
    }else{
      var query = `
      INSERT INTO reviews(user_id, product_id, comment)
      VALUES
      (?,?,?);
      `
      var arguments = [user_id, product_id, comment]
    }


    let addComment = await mariadb.query(query, arguments)
/*     console.log(typeof score !== 'undefined')
    console.log(score !== '') */
    return {
      comment: comment
    }
  },

  /**
   * Gets the reviews of an specific product, mean score and number of reviews
   * @param {*} product_id 
   * @returns {Object}
   *  * score: float
      * no_reviews: int
      * comments: string
   */
  getReviews: async function(product_id = 1) {
    let arguments = [product_id]
    
    let queryAVG = `SELECT AVG(score) FROM reviews WHERE product_id = ?;`
    let queryCount = `
      SELECT COUNT(comment)
      FROM reviews 
      WHERE product_id = ?
      AND comment IS NOT NULL
      AND comment <> ''
      ;`

    let queryArr = `
    SELECT comment 
    FROM reviews 
    WHERE product_id = ?
    AND comment IS NOT NULL
    AND comment <> ''
    ;`

    let getAvgReviews = await mariadb.query(queryAVG, arguments)
    let getCountReviews = await mariadb.query(queryCount, arguments)
    let getArrReviews = await mariadb.query(queryArr, arguments)

    let arr = []
    getArrReviews.forEach((val, index) => {
        arr.push(val["comment"])
    });
    
    return {
      score: getAvgReviews[0]["AVG(score)"],
      no_reviews: getCountReviews[0]["COUNT(comment)"],
      comments: arr
    }
  },

  /***
   * Gets the categories of all products
   * @returns {Object}
   *  * categories:  Object
   */
  getCategories: async function(){
    let queryGetCtg = `
    SELECT * 
    FROM categories 
    ;`

    let getCtg = await mariadb.query(queryGetCtg)

    let arr = []
    getCtg.forEach((val) => {
        arr.push(val)
    });
    
    return {
      categories: arr
    }
  }
}