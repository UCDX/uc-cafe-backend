const mariadb = require('./mariadb.service')

module.exports = {
  /**
   * Gets the user id only if the username exists and the password is correct.
   * @param {string} username 
   * @param {string} passwd 
   * @returns {number | undefined}
   */
  userAuthentication: async function(username, passwd) {
    const query = `
      SELECT id
      FROM users
      WHERE username = ? AND passwd = ?
      LIMIT 1;
    `
    const result = await mariadb.query(query, [username, passwd])
    return result[0].id
  }
}
