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
// usuario email contraseña y el nombre completo
// administrator joe@PiedPiper.org S3cr3tPass* Roberto Gomez Bolaños
var stdin_username = process.argv[2];
var stdin_email = process.argv[3];
var stdin_hashed = hash.update(process.argv[4]).digest('hex');
var stdin_fullname = "";
process.argv.forEach((val, index) => {
  if(index>4){
    stdin_fullname = stdin_fullname + val + " ";
  }
});

var stmt = "INSERT INTO admins(username, email, fullname, passwd) VALUES(?,?,?,?)";
var todo = [stdin_username, stdin_email, stdin_fullname, stdin_hashed];

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
