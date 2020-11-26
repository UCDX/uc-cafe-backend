// Including dependencies.
const express = require('express')
const path =  require('path')
const morgan = require('morgan')

// Environment variables.
let envpath = path.join(__dirname, '..', 'etc', '.env')
let res = require('dotenv').config({ path: envpath })
if(res.error) {
  console.error(".env file not found")
  console.error(res.error.message)
  process.exit(1)
}

const app = express()

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api/v1/', require('./api/interfaces'))

module.exports = app
