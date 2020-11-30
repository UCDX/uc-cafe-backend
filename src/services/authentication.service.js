const mariadb = require('./mariadb.service')

module.exports = {
  getAppDataByAPIKey: async function(apikey) {
    let q = `
      select
        id,
        name, 
        created_at
      from 
        authorized_apps
      where api_key = ? limit 1`
    
    let data = await mariadb.query(q, [apikey])
    return data[0]
  }
}