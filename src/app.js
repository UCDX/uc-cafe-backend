//Environment variables
const path =  require('path')

let envpath = path.join(__dirname, '..', 'etc', '.env')
let res = require('dotenv').config({ path: envpath })
if(res.error) {
  console.error(".env file not found")
  console.error(res.error.message)
  process.exit(1)
}

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

module.exports = app
