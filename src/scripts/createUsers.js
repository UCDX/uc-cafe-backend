const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const mariadb = require('../services/mariadb.service.js')

// inputs should be like this
// user password name surnames
// 180300352 S3cr3tPass* Roberto Gomez Bolaños
var stdin_username = process.argv[2];
var stdin_hashed = hash.update(process.argv[3]).digest('hex');
var stdin_name = process.argv[4];
var stdin_surnames = "";

process.argv.forEach((val, index) => {
  if(index>4){
    stdin_surnames = stdin_surnames + val + " ";
  }
});

var stmt = "INSERT INTO users(username, name, surnames, passwd) VALUES(?,?,?,?)";
var todo = [stdin_username, stdin_name, stdin_surnames, stdin_hashed];

mariadb.getConnection()
  .then(conn => {
    console.log("conected with id " + conn.threadId);
    conn.query("USE uccafe_dihm")
      .then((results) => {
        console.log(results); 
        conn.end(); 
      })

    conn.query(stmt, todo)
    .then((results) => {
      console.log('Registered with id ' + results.insertId);
    })

  .catch(err => {
    //handle error
    conn.end();
  })
  conn.end()
})
