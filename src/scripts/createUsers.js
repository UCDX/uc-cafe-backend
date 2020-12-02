// Environment variables. Keep loading environment variables at the top
// or stuff that depends on thery won't work.
const path =  require('path')
let envpath = path.join(__dirname, '..', '..', 'etc', '.env')
let res = require('dotenv').config({ path: envpath })
if(res.error) {
  console.error(".env file not found")
  console.error(res.error.message)
  process.exit(1)
}

const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const mariadb = require('../services/mariadb.service.js')

// la entrada debe ser de la siguiente manera
// usuario contraseña nomnbre apellidos
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
